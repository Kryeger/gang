const Business = require("./Business.js");

module.exports = class Taxi extends Business{
  constructor(ownerid, name, capital){
    super(ownerid, name, capital);
    this.workerTitle = "Taxi Driver";
    this.type = "Taxi";
  }
  gain(){
    this.capital += 100;
  }
}