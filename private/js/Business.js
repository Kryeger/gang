var _ = require('underscore');

module.exports = class Business{
  constructor(ownerid, name, capital){
    this._name = name;
    this._capital = capital;
    this._ownerid = ownerid;
  
    this._workers = []; //playerids for all workers
    this._assets = []; //real-estate
    this._inventory = []; //items
    this._safe = []; //temp
  }
  
  hirePlayer(userid){
    let ok = 1;
    _.forEach(this._workers, function(el, index, list){
      if(el == userid) ok = 0;
    });
    if(ok)
      this._workers.push(userid);
  }
  
  fire(playerid){
    this._workers.splice(this._workers.indexOf(playerid), 1);
  }
  
}