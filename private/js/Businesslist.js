const Business = require("./Business.js");
const List = require("./List.js");

module.exports = class Businesslist extends List{
  constructor(){
    super();
  }
  remove(businessid){
    this[businessid].disolve();
    this.splice(businessid, 1);
  }
  insert(business){
    business.setId(this.lastid);
    this.lastid++;
    this.push(business);
  }
}