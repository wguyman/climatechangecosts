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
    "description" : "Calculate the climate change cost of carbon for your car.",
    "path" : "/automobile.{format}",
    "notes" : "Returns the CO2 emitted and the associated cost. Data from BrighterPlanet.",
    "summary" : "Calculate the carbon cost with owning a car.",
    "method": "GET",
    "params" : [param.query("year", "Year of the car make", "string",false), 
                param.query("fuel", "Amount of Fuel used in a year", "string", false),
                param.query("distance", "Annual Distance Traveled in km", "string", false), 
                param.query("fuel_efficiency", "Fuel Efficiency (km/l)", "string", false), 
                param.query("make", "Car Make (\"mercedes\",\"bmw\")", "string", false), 
                param.query("model", "Car Model", "string", false), 
                param.query("hybrid", "Is the car a hybrid?", "string", false, false, "LIST[true,false]")],
    "nickname" : "getAutomobileCost"
  },
  'action': function (req,res) {
    
    var year = url.parse(req.url,true).query["year"];
    var fuel = url.parse(req.url,true).query["fuel"];
    var distance = url.parse(req.url,true).query["distance"];
    var fuel_efficiency = url.parse(req.url,true).query["fuel_efficiency"];
    var make = url.parse(req.url,true).query["make"];
    var model = url.parse(req.url,true).query["model"];
    var hybrid = url.parse(req.url,true).query["hybrid"];
    enviroData.getAutoCarbonCost(res, year, fuel, distance, fuel_efficiency, make, model, hybrid);
  }
};

exports.calculateComputationCarbonCost = {
  'spec': {
    "description" : "Calculate the climate change cost of a computation in a data center.",
    "path" : "/computation.{format}",
    "notes" : "The computation model measures the carbon footprint of hosting a website. The model can be used to calculate web hosting emissions for a single site visit, a website's operation over time, or an entire server farm. It's designed for sites hosted by IaaS (Infrastructure as a Service) providers, such as Amazon's Elastic Compute Cloud, Heroku, or Engine Yard. Simply send us the server's compute time (or include setup details for increased accuracy) and the service responds with the carbon emissions data to embed in your system. Data from BrighterPlanet.",
    "summary" : "Calculate the carbon cost of a computation in a data center.",
    "method": "GET",
    "params" : [param.query("carrier", "Hosting Provider (Amazon, Heroku..)", "string",false), 
                param.query("duration", "Number of Seconds used in Computation", "string", true),
                param.query("date", "Date of Computation (YYYY-MM-DD)", "string", false), 
                param.query("zip_code", "Zip Code", "string", false)],
    "nickname" : "getComputationCost"
  },
  'action': function (req,res) {
    
    var carrier = url.parse(req.url,true).query["carrier"];
    var duration = url.parse(req.url,true).query["duration"];
    var date = url.parse(req.url,true).query["date"];
    var zip_code = url.parse(req.url,true).query["zip_code"];
    enviroData.getComputationCarbonCost(res, carrier, duration, date, zip_code);
  }
};

exports.calculateDietCarbonCost = {
  'spec': {
    "description" : "Calculate the climate change cost of producing the food a person eats.",
    "path" : "/diet.{format}",
    "notes" : "The diet model calculates the carbon footprint of producing the food a person eats (In Grams). Built on a foundation of economic, environmental, and diet-related data from government and research institutions, it uses personal diet information to calculate an annual food footprint. It takes into account the full supply chain including cultivation, processing, packaging, transport, storage, and retail, to provide an accurate carbon score. Data from BrighterPlanet.",
    "summary" : "Calculate the cost of one's diet.",
    "method": "GET",
    "params" : [param.query("start_date", "Start Date of Diet (YYYY-MM-DD)", "string",false), 
                param.query("end_date", "End Date of Diet (YYYY-MM-DD)", "string", false),
                param.query("red_meat_share", "Red Meat Share (% - if you fill one out, you must complete each share field.)", "string", false), 
                param.query("poultry_share", "Poultry Share", "string", false),
                param.query("fish_share", "Fish Share", "string", false),
                param.query("eggs_share", "Eggs Share", "string", false),
                param.query("nuts_share", "Nuts Share", "string", false),
                param.query("dairy_share", "Dairy Share", "string", false),
                param.query("cereals_and_grains_share", "Cereals and Grains Share", "string", false),
                param.query("fruit_share", "Fruit Share", "string", false),
                param.query("vegetables_share", "Vegetables Share", "string", false),
                param.query("oils_and_sugars_share", "Oils and Sugars Share", "string", false),
                param.query("diet_class", "Diet Type", "string", false, false, "LIST[vegan,vegetarian,standard]")
                ],
    "nickname" : "getDietCost"
  },
  'action': function (req,res) {
    
    var start_date = url.parse(req.url,true).query["start_date"];
    var end_date = url.parse(req.url,true).query["end_date"];
    var red_meat_share = url.parse(req.url,true).query["red_meat_share"];
    var poultry_share = url.parse(req.url,true).query["poultry_share"];
    var fish_share = url.parse(req.url,true).query["fish_share"];
    var eggs_share = url.parse(req.url,true).query["eggs_share"];
    var nuts_share = url.parse(req.url,true).query["nuts_share"];
    var dairy_share = url.parse(req.url,true).query["dairy_share"];
    var cereals_and_grains_share = url.parse(req.url,true).query["cereals_and_grains_share"];
    var fruit_share = url.parse(req.url,true).query["fruit_share"];
    var vegetables_share = url.parse(req.url,true).query["vegetables_share"];
    var oils_and_sugars_share = url.parse(req.url,true).query["oils_and_sugars_share"];
    var diet_class = url.parse(req.url,true).query["diet_class"];
    enviroData.getDietCarbonCost(res, start_date, end_date, red_meat_share, poultry_share, fish_share, eggs_share, nuts_share, dairy_share, cereals_and_grains_share, fruit_share, vegetables_share, oils_and_sugars_share, diet_class);
  }
};
