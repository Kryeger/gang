var _ = require('underscore');

module.exports = class Player{
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    this.ownedCompanies = [];
  }
}