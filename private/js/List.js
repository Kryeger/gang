var _ = require('underscore');

module.exports = class List extends Array{
  save(){
    _.forEach(this, function(el, index, list){
      //TODO: individual queries? or just a big one?
      el.save();
    });
  }
}