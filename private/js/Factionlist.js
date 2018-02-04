// TBA
const List = require("./List.js");

module.exports = class Factionlist extends List{
  constructor(){
    super();
  }
    
    insert(faction){
        faction.setId(this.lastid);
        this.lastid++;
        this.push(faction);
  }
}