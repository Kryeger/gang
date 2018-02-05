var _ = require('underscore');

module.exports = class Player{
  constructor(firstName, lastName, id){
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = "";
    this.id;
    
    this._employer = []; //ids of businesses that employ the player;
    this._ownedBis = []; //ids
    this._ownedComp = []; //ids
  }
  
  getFormalName(){
    if(this.title != "")
      return (this.title + " " + this.firstName + " " + this.lastName);
    return (this.firstName + " " + this.lastName);
  }
  
  getJob(businessid){
    this._employer.push(businessid);
  }
  
  quitJob(businessid){
    this._employer.splice(this._employer.indexOf(businessid), 1);
  }
  
  acquireNewBusiness(id){
    this._ownedBis.push(id);
    console.log("First biz:" + this._ownedBis[0]);
    console.log("Second biz:" + this._ownedBis[1]);
  }
}