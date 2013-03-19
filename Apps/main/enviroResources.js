var sw = require("../../Common/node/swagger.js");
var param = require("../../Common/node/paramTypes.js");
var url = require("url");
var swe = sw.errors;

var enviroData = require("./enviroData.js");

function writeResponse (res, data) {
	sw.setHeaders(res);
  res.send(JSON.stringify(data));
}

exports.models = require("./models.js");



exports.findEconData = {
  'spec': {
    "description" : "Get data on the economical cost of Climate Change in 2010 and 2030 (predicted)",
    "path" : "/econ.{format}",
    "notes" : "Returns cost data on Climate Change thanks to data from http://daraint.org/",
    "summary" : "Get the data by sector on the environment.",
    "method": "GET",
    "params" : [param.query("Country", "Can specify whether all countries or usa only.", "string", false, false, "LIST[total,usa]"), param.query("climateOrCarbon", "Can specify whether only want Climate related costs or Carbon costs.", "string", false, false, "LIST[Carbon,Climate]")],
    "nickname" : "getEconData"
  },
  'action': function (req,res) {
    
    var country = url.parse(req.url,true).query["Country"];
    var climateOrCarbon = url.parse(req.url,true).query["climateOrCarbon"];
    enviroData.getEconData(res, country, climateOrCarbon);
  }
};

exports.findDeathData = {
  'spec': {
    "description" : "Get death count due to Climate Change in 2010 and 2030 (predicted)",
    "path" : "/deaths.{format}",
    "notes" : "Returns number of deaths from Climate Change thanks to data from http://daraint.org/",
    "summary" : "Figure out how many people have died due to Climate Change.",
    "method": "GET",
    "params" : [param.query("climateOrCarbon", "Can specify whether only want Climate related deaths or Carbon deaths.", "string", false, false, "LIST[Carbon,Climate]")],
    "nickname" : "getDeaths"
  },
  'action': function (req,res) {
    var climateOrCarbon = url.parse(req.url,true).query["climateOrCarbon"];
    enviroData.getDeaths(res, climateOrCarbon);
  }
};

exports.calculateAutoCarbonCost = {
  'spec': {
    "description" : "Calculate the cost of carbon for your automobile",
    "path" : "/automobile.{format}",
    "notes" : "Returns the CO2 emitted and the associated cost. Data from BrighterPlanet.",
    "summary" : "Calculate the carbon cost with owning a car.",
    "method": "GET",
    "params" : [param.query("year", "Year of the car make", "string",false), param.query("fuel", "Amount of Fuel used in a year", "string", false), param.query("hybrid", "Is the car a hybrid?", "string", false, false, "LIST[true,false]")],
    "nickname" : "getAutomobileCost"
  },
  'action': function (req,res) {
    
    var year = url.parse(req.url,true).query["year"];
    var fuel = url.parse(req.url,true).query["fuel"];
    var hybrid = url.parse(req.url,true).query["hybrid"];
    enviroData.getAutoCarbonCost(res, year, fuel, hybrid);
  }
};

// exports.findById = {
//   'spec': {
//     "description" : "Operations about pets",
//     "path" : "/pet.{format}/{petId}",
//     "notes" : "Returns a pet based on ID",
//     "summary" : "Find pet by ID",
//     "method": "GET",
//     "params" : [param.path("petId", "ID of pet that needs to be fetched", "string")],
//     "responseClass" : "Pet",
//     "errorResponses" : [swe.invalid('id'), swe.notFound('pet')],
//     "nickname" : "getPetById"
//   },
//   'action': function (req,res) {
//     if (!req.params.petId) {
//       throw swe.invalid('id'); }
//     var id = parseInt(req.params.petId);
//     var pet = enviroData.getPetById(id);

//     if(pet) res.send(JSON.stringify(pet));
//     else throw swe.notFound('pet');
//   }
// };

// exports.findByStatus = {
//   'spec': {
//     "description" : "Operations about pets",  
//     "path" : "/pet.{format}/findByStatus",
//     "notes" : "Multiple status values can be provided with comma-separated strings",
//     "summary" : "Find pets by status",
//     "method": "GET",    
//     "params" : [
//       param.query("status", "Status in the store", "string", true, true, "LIST[available,pending,sold]", "available")
//     ],
//     "responseClass" : "List[Pet]",
//     "errorResponses" : [swe.invalid('status')],
//     "nickname" : "findPetsByStatus"
//   },  
//   'action': function (req,res) {
//     var statusString = url.parse(req.url,true).query["status"];
//     if (!statusString) {
//       throw swe.invalid('status'); }

//     var output = enviroData.findPetByStatus(statusString);
//     res.send(JSON.stringify(output));
//   }
// };

// exports.findByTags = {
//   'spec': {
//     "path" : "/pet.{format}/findByTags",
//     "notes" : "Multiple tags can be provided with comma-separated strings. Use tag1, tag2, tag3 for testing.",
//     "summary" : "Find pets by tags",
//     "method": "GET",    
//     "params" : [param.query("tags", "Tags to filter by", "string", true, true)],
//     "responseClass" : "List[Pet]",
//     "errorResponses" : [swe.invalid('tag')],
//     "nickname" : "findPetsByTags"
//   },
//   'action': function (req,res) {
//     var tagsString = url.parse(req.url,true).query["tags"];
//     if (!tagsString) {
//       throw swe.invalid('tag'); }
//     var output = enviroData.findPetByTags(tagsString);
//     writeResponse(res, output);
//   }
// };

// exports.addPet = {
//   'spec': {
//     "path" : "/pet.{format}",
//     "notes" : "adds a pet to the store",
//     "summary" : "Add a new pet to the store",
//     "method": "POST",
//     "params" : [param.post("Pet", "Pet object that needs to be added to the store")],
//     "errorResponses" : [swe.invalid('input')],
//     "nickname" : "addPet"
//   },  
//   'action': function(req, res) {
//     var body = req.body;
//     if(!body || !body.id){
//       throw swe.invalid('pet');
//     }
//     else{
// 	    enviroData.addPet(body);
// 	    res.send(200);
// 	  }  
//   }
// };

// exports.updatePet = {
//   'spec': {
//     "path" : "/pet.{format}",
//     "notes" : "updates a pet in the store",
//     "method": "PUT",    
//     "summary" : "Update an existing pet",
//     "params" : [param.post("Pet", "Pet object that needs to be updated in the store", "{\n  \"id\": 3,\n  \"category\": {\n    \"id\": 2,\n    \"name\": \"Cats\"\n  },\n  \"name\": \"Cat 3\",\n  \"urls\": [\n    \"url1\",\n    \"url2\"\n  ],\n  \"tags\": [\n    {\n      \"id\": 3,\n      \"name\": \"tag3\"\n    },\n    {\n      \"id\": 4,\n      \"name\": \"tag4\"\n    }\n  ],\n  \"status\": \"available\"\n}")],
//     "errorResponses" : [swe.invalid('id'), swe.notFound('pet'), swe.invalid('input')],
//     "nickname" : "addPet"
//   },  
//   'action': function(req, res) {
//     var body = req.body;
//     if(!body || !body.id){
//       throw swe.invalid('pet');
//     }
//     else {
// 	    enviroData.addPet(body);
// 	    res.send(200);
// 	  }
//   }
// };

// exports.deletePet = {
//   'spec': {
//     "path" : "/pet.{format}/{id}",
//     "notes" : "removes a pet from the store",
//     "method": "DELETE",
//     "summary" : "Remove an existing pet",
//     "params" : [param.path("id", "ID of pet that needs to be removed", "string")],
//     "errorResponses" : [swe.invalid('id'), swe.notFound('pet')],
//     "nickname" : "deletePet" 
//   },  
//   'action': function(req, res) {
//     var id = parseInt(req.params.id);
//     enviroData.deletePet(id)
//     res.send(200);
//   }
// };
