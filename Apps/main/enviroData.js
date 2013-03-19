var tags = {
  1: {id: 1, name: "tag1"},
  2: {id: 2, name: "tag2"},
  3: {id: 3, name: "tag3"},
  4: {id: 4, name: "tag4"}};

var categories = {
  1: {id: 1, name: "Dogs"},
  2: {id: 2, name: "Cats"},
  3: {id: 3, name: "Rabbits"},
  4: {id: 4, name: "Lions"}};

var pets = {
  1: {id: 1, 
		  category: categories[2], 
		  name: "Cat 1", 
		  urls: ["url1", "url2"], 
		  tags: [tags[1], tags[2]],
		  status: "available"},
  2: {id: 2, 
      category: categories[2], 
      name: "Cat 2", 
      urls: ["url1", "url2"], 
      tags: [tags[2], tags[3]],
      status: "available"},
  3: {id: 3, 
      category: categories[2], 
      name: "Cat 3", 
      urls: ["url1", "url2"], 
      tags: [tags[3], tags[4]],
      status: "available"},
  4: {id: 4, 
      category: categories[1], 
      name: "Dog 1", 
      urls: ["url1", "url2"], 
      tags: [tags[1], tags[2]],
      status: "available"},
  5: {id: 5, 
      category: categories[1], 
      name: "Dog 2", 
      urls: ["url1", "url2"], 
      tags: [tags[2], tags[3]],
      status: "available"},
  6: {id: 6, 
      category: categories[1], 
      name: "Dog 3", 
      urls: ["url1", "url2"], 
      tags: [tags[3], tags[4]],
      status: "available"},
  7: {id: 7, 
      category: categories[4], 
      name: "Lion 1", 
      urls: ["url1", "url2"], 
      tags: [tags[1], tags[2]],
      status: "available"},
  8: {id: 8, 
      category: categories[4], 
      name: "Lion 2", 
      urls: ["url1", "url2"], 
      tags: [tags[2], tags[3]],
      status: "available"},
  9: {id: 9, 
      category: categories[4], 
      name: "Lion 3", 
      urls: ["url1", "url2"], 
      tags: [tags[3], tags[4]],
      status: "available"},
  10: {id: 10, 
      category: categories[3], 
      name: "Rabbit 1", 
      urls: ["url1", "url2"], 
      tags: [tags[3], tags[4]],
      status: "available"}
};


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

exports.getPetById = function getPetById(id) {
  return pets[id];
}


exports.findPetByStatus = function findPetByStatus(status) {
  var keys = {}
  var array = status.split(",");
    array.forEach(function(item) {
      keys[item] = item;
    })
  var output = [];
  for(key in pets) {
    var pet = pets[key];
    if(pet.status && keys[pet.status]) output.push(pet);
  }
  return output;
}

exports.findPetByTags = function findPetByTags(tags) {
  var keys = {}
  var array = tags.split(",");
	array.forEach(function(item) {
	  keys[item] = item;
	})
  var output = [];
  for(key in pets) {
    var pet = pets[key];
    if(pet.tags) {
      pet.tags.forEach(function (tag) {
        if(tag.name && keys[tag.name]) output.push(pet);
      });
    }
  }
  return output;
}

exports.addPet = function addPet(pet){
  pets[pet.id] = pet;
}

exports.deletePet = function deletePet(id) {
  delete pets[id];
}