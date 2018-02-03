module.exports = class Business{
  constructor(owner, name, capital){
    this.name = name;
    this.capital = capital;
    this.owner = owner;
  
    this._workers = []; //playerids for all workers
  }
  hire(playerid){
    this._workers.push(playerid);
  }
  fire(playerid){
    this._workers.splice(this._workers.indexOf(playerid), 1);
  }
}