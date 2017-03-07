var game = {
  totalDays: 0,
  daysLeft: 10
};

var caravan = {
  party: [],
  food: 200,
  medicine: 5
  // this.wagonParts = 5;
}

function Character(name) {
  this.name = name;
  this.health = 100;
  this.diseased = false;
}

Character.prototype.healthGain = function() {
  this.health += 20;
}

Character.prototype.healthLoss = function() { //daily health loss
  if(this.diseased===true){
    this.health -= 3;
  }
  else this.health -= 1;
}



var trailPrompt = function(inputNumber) {
  switch (inputNumber) {
    case 1:
      travel();
      break;
    case 2:
      rest();
      break;
    case 3:
      hunt();
      break;
  }
}

var fortPrompt = function(inputNumber) {
  switch (inputNumber) {
    case 1:
      travel();
      break;
    case 2:
      rest();
      break;
    case 3:
      hunt();//replace with trade?
      break;
  }
}

function fates(roll) {
  var charIndex = rollNumber(0,5);
  if(roll<=7) {
    console.log(caravan.party[charIndex].name+" has been diseased!");
    caravan.party[charIndex].diseased=true;
  }else if(roll<=14){
    console.log(caravan.party[charIndex].name+" has broken their foot!");
    caravan.party[charIndex].health-=50;
  }else if(roll<=21){
    console.log(caravan.party[charIndex].name+" has dropped a lot of food!")
    caravan.food-=50;
  }

}

function rollNumber(min, max) {
  min = Math.ceil(min);  //inclusive
  max = Math.floor(max); //exclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

function rest() {
  caravan.food -= 2 * caravan.party.length;
  if (caravan.food <= 0) {
    caravan.food = 0;
    console.log("Out of food!");
  }

  caravan.party.forEach(function (element) {
    element.healthGain();
  });
  game.totalDays++;
}

function hunt() {
  caravan.food -= 2 * caravan.party.length;
  meatGained = rollNumber(1, 10);
  console.log(meatGained);
  caravan.food += meatGained * caravan.party.length;
  game.totalDays++;
}

function travel() {
  var roll = rollNumber(1,101);
  console.log(roll);
  fates(roll);
  caravan.food -= 2 * caravan.party.length;
  caravan.party.forEach(function (element) {
    element.healthLoss();
  });
  game.totalDays++;
  game.daysLeft--;
  console.log(char1, char2, char3, char4, char5, caravan);
  if (game.daysLeft === 0) {
    var prom = parseInt(prompt("1 2 or 3"));
    fortPrompt(prom);
  } else {
    var prom = parseInt(prompt("1) Travel, 2) Rest or 3) Hunt"));
    trailPrompt(prom);
  }
}



var char1 = new Character("Ryan");
var char2 = new Character("Riley");
var char3 = new Character("Chris");
var char4 = new Character("Gloria");
var char5 = new Character("Megan");
caravan.party.push(char1, char2, char3, char4, char5);

var prom = parseInt(prompt("1) Travel, 2) Rest or 3) Hunt"));
trailPrompt(prom);
