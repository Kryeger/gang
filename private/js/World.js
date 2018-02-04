const Player = require("./Player.js");
const User = require("./User.js");
const List = require("./List.js");
const Util = require("./Util.js");
const Company = require("./Company.js");
const Faction = require("./Faction.js");
const Department = require("./Department.js");
const Business = require("./Business.js");
const Brothel = require("./Brothel.js");
const Taxi = require("./Taxi.js");

const Userlist = require("./Userlist.js");
const Companylist = require("./Companylist.js");
const Businesslist = require("./Businesslist.js");
const Factionlist = require("./Factionlist.js");
var _ = require('underscore');

module.exports = class World{
  constructor(){
    //TODO: queries
    this.ul = new Userlist;
    this.cl = new Companylist;
    this.bl = new Businesslist;
    this.fl = new Factionlist;
  }
  createNewBusiness(ownerid, name, capital, type){
    switch(type){
      //TODO: make this better
      case "brothel":
        var nb = new Brothel(ownerid, name, capital);
        break;
      case "taxi":
        var nb = new Taxi(ownerid, name, capital);
        break;
    }
    this.bl.insert(nb);
    this.ul[ownerid].ownedBis.push(this.bl.length - 1);
    console.log(this.bl);
  }
}