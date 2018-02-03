const Business = require("./Business.js")

module.exports = class Brothel extends Business{
  constructor(){
    super();
    this.title = "Prostitute";
    this.type = "Brothel";
    this.gain();
  }
  gain(){
    console.log("test" + this.type);
  }
}