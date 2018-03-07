var _ = require('underscore');

module.exports = class List extends Array{

  constructor(){
    super();
    this._lastid = 0;
  }
  
  insert(obj){
    this.push(obj);
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
  
  findObj(varname, varval){
    var found = 0;
    for(var i = 0; i < this.length; ++i){
      if(this[i][varname] == varval){
        return this[i];
      }
    }
  }
}