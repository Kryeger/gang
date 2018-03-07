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
    this._ul = new Userlist;
    this._cl = new Companylist;
    this._bl = new Businesslist;
    this._fl = new Factionlist;
  }
  
  //UTILS
  
  validate(obj){
    let id = obj.id;
    let key = obj.key;
    var index = _.where(S._ul, {userid: parseInt(id)});
    console.log(id, key, index);
    if(index[0].userkey == key){
      return index;
    }
    return 0;
  }
  
  //BUSINESS
  
  createNewBusiness(ownerid, name, capital, type){
    let bisid;
    if(bisid = this._bl.createNewBusiness(ownerid, name, capital, type)){
      this._ul.findObj("id", ownerid).addOwnedBis(bisid);
    }
  }
  
  //USER
  
  removeUser(id){
    this._ul.remove(id);
  }
  
  removeSocket(socketid){
    this._ul.removeSocket(socketid);
  }
  
  insertSocket(userObj, socketid){
    this._ul.insert(userObj, socketid);
  }
}