// TBA
const List = require("./List.js");

module.exports = class Factionlist extends List{
  constructor(){
    super();
    this.lastid = 0;
  }
    
    insert(faction){
        faction.setId(this.lastid);
        this.lastid++;
        this.push(faction);
  }
}