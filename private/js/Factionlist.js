// TBA
const List = require("./List.js");

module.exports = class Factionlist extends List{
  constructor(){
    super();
    this.lastid = 0;
  }
  remove(varname, varval, onlyfirst = 1){
    var found = 0;
    for(var i = 0; i < this.length; ++i){
        if(this[i][varname] == varval){
            this.splice(i, 1);
            if(onlyfirst)
                return 1;
            found = 1;
            --i;
        }
    }
    return found;
  }
    insert(faction){
        faction.setId(this.lastid);
        this.lastid++;
        this.push(faction);
  }
}