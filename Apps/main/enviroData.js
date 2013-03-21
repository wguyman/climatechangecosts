


/** BRIGHTER PLANET API KEY **/
process.env.CM1_KEY = 'e708a57d0d60cd12483d7811e8e34edf';

//Sample Brighter planet data query
var CM1 = require('CM1');

//Firebase data reference
var Firebase = require('../../firebase-node');

var TOTAL_CO2_2010 = 33508901000000;
var TOTAL_COST_2010 = 1140000000000;

exports.getAutoCarbonCost = function getAutoCarbonCost(res, year_param, fuel, distance, fuel_efficiency, make, model, hybrid) {
  var model = CM1.model('automobile', {
  year: year_param,
  annual_fuel_use: fuel,
  hybridity: hybrid,
  annual_distance: distance,
  fuel_efficiency: fuel_efficiency,
  make: make,
  model: model
  });
  console.log(model);

  model.getImpacts(function(err, impacts) {
    if(err) return console.log('CM1 connection failed', err);
    var sendDataBack;
    var calculatedCarbon = parseInt(impacts.carbon);
    var cost_result = (calculatedCarbon/TOTAL_CO2_2010)*TOTAL_COST_2010;

    console.log('Carbon for car (kgC02e): ',
              impacts.carbon);
    console.log('Methodology: ', impacts.methodology);
    console.log("Cost result:", cost_result);
    sendDataBack = {"Carbon for car (kgC02e)": impacts.carbon,"Methodology": impacts.methodology,"Externalized Cost on the Climate in 2010 ($)": cost_result};

    res.send(JSON.stringify(sendDataBack));
  });

}


exports.getComputationCarbonCost = function getComputationCarbonCost(res, carrier, duration, date, zip_code) {
  var model = CM1.model('computation', {
  carrier: carrier,
  duration: duration,
  date: date,
  zip_code: zip_code
  });
  console.log(model);

  model.getImpacts(function(err, impacts) {
    if(err) return console.log('CM1 connection failed', err);
    var sendDataBack;
    var calculatedCarbon = parseInt(impacts.carbon);
    var cost_result = (calculatedCarbon/TOTAL_CO2_2010)*TOTAL_COST_2010;

    console.log('Carbon for computation (kgC02e): ',
              impacts.carbon);
    console.log('Methodology: ', impacts.methodology);
    console.log("Cost result:", cost_result);
    sendDataBack = {"Carbon for computation (kgC02e)": impacts.carbon,"Methodology": impacts.methodology,"Externalized Cost on the Climate in 2010 ($)": cost_result};

    res.send(JSON.stringify(sendDataBack));
  });

}


exports.getDietCarbonCost = function getDietCarbonCost(res, start_date, end_date, red_meat_share, poultry_share, fish_share, eggs_share, nuts_share, dairy_share, cereals_and_grains_share, fruit_share, vegetables_share, oils_and_sugars_share, diet_class) {
  var model = CM1.model('diet', {
  start_date: start_date,
  end_date: end_date,
  red_meat_share: red_meat_share,
  poultry_share: poultry_share,
  fish_share: fish_share,
  eggs_share: eggs_share,
  nuts_share: nuts_share,
  dairy_share: dairy_share,
  cereals_and_grains_share: cereals_and_grains_share,
  fruit_share: fruit_share,
  vegetables_share: vegetables_share,
  oils_and_sugars_share: oils_and_sugars_share,
  diet_class: diet_class
  });
  console.log(model);

  model.getImpacts(function(err, impacts) {
    if(err) return console.log('CM1 connection failed', err);
    var sendDataBack;
    var calculatedCarbon = parseInt(impacts.carbon);
    var cost_result = (calculatedCarbon/TOTAL_CO2_2010)*TOTAL_COST_2010;

    console.log('Carbon for diet (kgC02e): ',
              impacts.carbon);
    console.log('Methodology: ', impacts.methodology);
    console.log("Cost result:", cost_result);
    sendDataBack = {"Carbon for diet (kgC02e)": impacts.carbon,"Methodology": impacts.methodology,"Externalized Cost on the Climate in 2010 ($)": cost_result};

    res.send(JSON.stringify(sendDataBack));
  });

}


exports.getFlightCarbonCost = function getFlightCarbonCost(res, date, segments_per_trip, trips, seats, distance_estimate, origin_airport, destination_airport, aircraft, airline, seat_class) {
  var model = CM1.model('flight', {
  date: date,
  segments_per_trip: segments_per_trip,
  trips: trips,
  seats: seats,
  distance_estimate: distance_estimate,
  origin_airport: origin_airport,
  destination_airport: destination_airport,
  aircraft: aircraft,
  airline: airline,
  seat_class: seat_class
  });
  console.log(model);

  model.getImpacts(function(err, impacts) {
    if(err) return console.log('CM1 connection failed', err);
    var sendDataBack;
    var calculatedCarbon = parseInt(impacts.carbon);
    var cost_result = (calculatedCarbon/TOTAL_CO2_2010)*TOTAL_COST_2010;

    console.log('Carbon for flight (kgC02e): ',
              impacts.carbon);
    console.log('Methodology: ', impacts.methodology);
    console.log("Cost result:", cost_result);
    sendDataBack = {"Carbon for flight (kgC02e)": impacts.carbon,"Methodology": impacts.methodology,"Externalized Cost on the Climate in 2010 ($)": cost_result};

    res.send(JSON.stringify(sendDataBack));
  });

}

exports.getEconData = function getEconData(res, country, climateOrCarbon) {
  var enviroRef = new Firebase('https://enviro.firebaseio.com/econ');
  var resultingDataRef;

  if(country){
    resultingDataRef = enviroRef.child(country);
  }else if(climateOrCarbon){
    resultingDataRef = enviroRef.child("usa").child(climateOrCarbon);
  }
  else{
    resultingDataRef = enviroRef;
  }  


  resultingDataRef.on('value', function(snapshot) {
    var sendData = snapshot.val();
    // Given a DataSnapshot containing a child 'fred' and a child 'wilma':
    // snapshot.forEach(function(childSnapshot) {
    //   // This code will be called twice.
    //   var name = childSnapshot.name();
    //   var childData = childSnapshot.val();
    //   // name will be 'fred' the first time and 'wilma' the second time.
    //   // childData will be the actual contents of the child.
    //   console.log("name: " + name);
    //   console.log(" data: " + childData.country);
    //   sendData[name]= childData;
    // });
      res.send(sendData);
  });    

}

exports.getDeaths = function getDeaths(res, climateOrCarbon) {
  var enviroRef = new Firebase('https://enviro.firebaseio.com/deaths');
  var resultingDataRef;
  if(climateOrCarbon){
    resultingDataRef = enviroRef.child(climateOrCarbon);
  }
  else{
    resultingDataRef = enviroRef;
  }  
  resultingDataRef.on('value', function(snapshot) {
    var sendData = snapshot.val();
    // Given a DataSnapshot containing a child 'fred' and a child 'wilma':
    // snapshot.forEach(function(childSnapshot) {
    //   // This code will be called twice.
    //   var name = childSnapshot.name();
    //   var childData = childSnapshot.val();
    //   // name will be 'fred' the first time and 'wilma' the second time.
    //   // childData will be the actual contents of the child.
    //   console.log("name: " + name);
    //   console.log(" data: " + childData.country);
    //   sendData[name]= childData;
    // });
      res.send(sendData);
  });    

}
