


/** BRIGHTER PLANET API KEY **/
process.env.CM1_KEY = 'e708a57d0d60cd12483d7811e8e34edf';

//Sample Brighter planet data query
var CM1 = require('CM1');

//Firebase data reference
var Firebase = require('../../firebase-node');

exports.getAutoCarbonCost = function getAutoCarbonCost(res, year_param, fuel, hybrid) {
  var model = CM1.model('automobile', {
  year: year_param,
  annual_fuel_use: fuel,
  hybridity: hybrid
  });
  console.log(model);

  model.getImpacts(function(err, impacts) {
    if(err) return console.log('CM1 connection failed', err);
    var sendDataBack;
    var calculatedCarbon = parseInt(impacts.carbon);
    var TOTAL_CO2_2010 = 33508901000000;
    var TOTAL_COST_2010 = 1140000000000;


    var cost_result = (calculatedCarbon/TOTAL_CO2_2010)*TOTAL_COST_2010;

    console.log('Carbon for car (kgC02e): ',
              impacts.carbon);
    console.log('Methodology: ', impacts.methodology);
    console.log("Cost result:", cost_result);
    sendDataBack = {"Carbon for car (kgC02e)": impacts.carbon,"Methodology": impacts.methodology,"Externalized Cost on the Climate in 2010 ($)": cost_result};

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
