var _ = require('underscore');

module.exports = class Player{
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = "";
    
    this._employer = []; //ids of businesses that employ the player;
  }
  getFormalName(){
    if(this.title != "")
      return (this.title + " " + this.firstName + " " + this.lastName);"")
    return (this.firstName + " " + this.lastName);
  }
  getJob(businessid){
    this._employer.push(businessid);
  }
  quitJob(businessid){
    this._employer.splice(this._employer.indexOf(businessid), 1);
  }
}