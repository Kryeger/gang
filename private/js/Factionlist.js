const List = require("./List.js");

module.exports = class Factionlist extends List{
  constructor(){
    super();
  }
    
    insert(faction){
        faction.id = this.lastid;
        this.lastid++;
        this.push(faction);
  }
}