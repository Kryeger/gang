const User = require("./User.js");
const List = require("./List.js");

module.exports = class Userlist extends List{
  constructor(){
    super();
  }
  insert(userObj, socketid){
    for(var i = 0; i < this.length; i++){
      if(userObj.id == this[i].userid){
        this[i].sockets.push(socketid);
        return 0;
      }
    }
    this.push(new User(userObj.id, userObj.username, userObj.userkey, socketid, 0));
  }
  removeSocket(socketid){
    _.forEach(this, function(el, index, list){
      var x = el.sockets.indexOf(socketid);
      if(x > -1){
        el.sockets.splice(x, 1);
        if(!el.sockets.length){
          list.splice(index, 1);
        }
      }
    });
  }
  removeUser(userid){
    _.forEach(this, function(el, index, list){
      if(el.userid == userid){
        list.splice(index, 1);
      }
    });
  }
  getPlayerName(userid){
    var user = _.where(this, {userid: userid});
    return user.firstName + " " + user.lastName;
  }
}