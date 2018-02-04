var _ = require('underscore');

module.exports = class List extends Array{
  save(){
    _.forEach(this, function(el, index, list){
      //TODO: individual queries? or just a big one?
      el.save();
    });
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
}