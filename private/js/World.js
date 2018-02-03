const Userlist = require("./Userlist.js");
const Companylist = require("./Companylist.js");
const Businesslist = require("./Businesslist.js");
var _ = require('underscore');

module.exports = class World{
  constructor(){
    //TODO: queries
    this.users = new Userlist;
    this.companies = new Companylist;
  }
  passTime(time){
    var interval = setInterval(function(){
      _.forEach(this.companies, function(el, index, list){
        el.earn(10);
      });
      if(!time--) clearInterval(interval);
    }, 1000);
  }
  static init(){
    //TODO: fetch info from db to populate the Lists
    
  }
}