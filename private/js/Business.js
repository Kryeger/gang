module.exports = class Business{
  constructor(owner, name, capital){
    this.name = name;
    this.capital = capital;
    this.owner = owner;
  
    this._workers = []; //playerids for all workers
  }
  gain(){
    _.forEach(_workers, function(el, index, list){
      this.capital += 5; //temp
    });
  }
  fire(playerid){
    this._workers.splice(this._workers(playerid), 1);
  }
}