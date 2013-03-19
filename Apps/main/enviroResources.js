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
