var _ = require('underscore');

module.exports = class Player{
  constructor(firstName, lastName){
    this._firstName = firstName;
    this._lastName = lastName;
    this._title = "";
    
    this._employers = []; //ids of businesses that employ the player;
    this._ownedBis = []; //ids
    this._ownedComp = []; //ids
  }
  
  getFormalName(){
    if(this._title != "")
      return (this._title + " " + this._firstName + " " + this._lastName);
    return (this._firstName + " " + this._lastName);
  }
  
  addOwnedBis(id){
    this._ownedBis.push(id);
  }
}