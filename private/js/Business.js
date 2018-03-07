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
  hire(playerid){
    this._workers.push(playerid);
  }
  fire(playerid){
    this._workers.splice(this._workers.indexOf(playerid), 1);
  }
}