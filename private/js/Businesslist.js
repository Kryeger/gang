const Business = require("./Business.js");
const List = require("./List.js");

const Brothel = require("./Brothel.js");
const Taxi = require("./Taxi.js");

module.exports = class Businesslist extends List{
  constructor(){
    super();
  }
  //new
  remove(businessid){
    this[businessid].disolve();
    this.splice(businessid, 1);
  }
  
  createNewBusiness(ownerid, name, capital, type){
    var nb;
    switch(type){
      //TODO: make this better
      case "brothel":
        nb = new Brothel(ownerid, name, capital);
        break;
      case "taxi":
        nb = new Taxi(ownerid, name, capital);
        break;
    }
    
    nb._id = this._lastid;
    this._lastid++;
    
    //insert the business in the list
    this.insert(nb);
    
    console.log(nb);
    
    return nb._id;
  }
}