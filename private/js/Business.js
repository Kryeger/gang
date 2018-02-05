module.exports = class Business{
  constructor(ownerid, name, capital){
    this.name = name;
    this.capital = capital;
    this.ownerid = ownerid;
  
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
  
  disolve(){
    //TODO: add w/e needs to be done at closure
    console.log("Business #" + this.id + " has closed.");
  }
  
  //GET
  
  //SET
  
  setId(id){
    this.id = id;
  }
}