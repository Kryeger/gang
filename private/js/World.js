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
  
  validate(id, key){//checks if the pair is valid
    var index = _.where(this.ul, {id: parseInt(id)});
    if(index[0].userkey == key){
      return index;
    } return 0;
  }
  
  findObj(id, list){ //returns the object who has the .id == id
    return _.where(list, {id: parseInt(id)})[0].player;
  }
  
  findCurrentId(id, list){ //returns the index of the object who has the .id == id
    return _.findLastIndex(list, {id: parseInt(id)});
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
    this.bl.insert(nb);
    this.findObj(ownerid, this.ul).acquireNewBusiness(this.bl[this.bl.length - 1].id);
  }
  
  closeBusiness(id){
    var bisid = this.findCurrentId(id, this.bl);
    var bis = this.findObj(id, this.bl);
    
    //TODO: pay cash, sell stuff idk
    this.bl.remove(bisid);
  }
}