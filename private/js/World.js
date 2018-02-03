const Userlist = require("./Userlist.js");
const Companylist = require("./Companylist.js");
const Businesslist = require("./Businesslist.js");
const Factionlist = require("./Factionlist.js");
var _ = require('underscore');

module.exports = class World{
  constructor(){
    //TODO: queries
    this.users = new Userlist;
    this.cl = new Companylist;
    this.bl = new Businesslist;;
    this.fl = new Factionlist;
  }
  init(){
    
  }
}