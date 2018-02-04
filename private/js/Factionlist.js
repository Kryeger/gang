// TBA
const List = require("./List.js");

module.exports = class Factionlist extends List{
  constructor(){
    super();
  }
  remove(factionid){
    this[factionid].disolve();
    this.splice(factionid, 1);
  }
  insert(faction){
    this.push(faction);
  }
}