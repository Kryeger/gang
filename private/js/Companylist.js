const Company = require("./Company.js");
const List = require("./List.js");

module.exports = class Companylist extends List{
  constructor(){
    super();
  }
  remove(companyid){
    this[companyid].disolve();
    this.splice(companyid, 1);
  }
  insert(company){
    this.push(company);
  }
}

