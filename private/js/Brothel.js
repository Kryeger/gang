const Business = require("./Business.js");
ul = require("./Business.js");

module.exports = class Brothel extends Business{
  constructor(ownerid, name, capital){
    super(ownerid, name, capital);
    this.workerTitle = "Escort";
    this.type = "Brothel";
  }
  gain(){
    this.capital += 100;
  }
}