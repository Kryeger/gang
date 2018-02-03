module.exports = class Company{
  constructor(name, capital, founder /*, type*/){
    this.name = name;
    
    //id of the user
    
    this.founder = founder;
    this.capital = capital;
    //FIXME: change type
    this.type = "company";
    //private
    this._baseProfit = 10;
  }
  //NOTE: just temp funcs to test stuff out
  save(){
    
  }
  close(){
    //TODO:Stuff to do before deleting everything
  }
}