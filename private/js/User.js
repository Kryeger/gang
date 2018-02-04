mysql = require('mysql');
const Util = require("./Util.js");
const Player = require("./Player.js");
var _ = require('underscore');

var U = new Util();

var con = mysql.createConnection({
  host: "den1.mysql5.gear.host",
  user: "gang",
  password: "browntacocat123!",
  database : 'gang'
});

con.connect(function(err){
  if (err) {
    throw err;
  }
});

module.exports = class User{
  constructor(userid, username, userkey, socket, firstName, lastName){
    this.userid = userid;
    this.username = username;
    this.userkey = userkey;
    this.sockets = [];//TODO: maybe make this a class as well
    this.sockets.push(socket);
    
    
    var classptr = this;
    this.setPlayer(function(player){
      classptr.player = player;
    });
  }
  setPlayer(cb){
    var id = this.userid;
    //check if user already has a player
    con.query("SELECT player FROM users WHERE id = '" + this.userid + "'", function(err, result){
      if(err) throw err;
      if(result[0].player){
        console.log("found a player");
        U.fetch(["firstName", "lastName"], "players", [["id", result[0].player]], function(result){
          var player = new Player(result[0].firstName, result[0].lastName);
          cb(player);
        });
      } else {
        var fname = chance.first();
        var lname = chance.last();
        con.query("INSERT INTO players (firstName, lastName ) VALUES (" + con.escape(fname) + "," + con.escape(lname) + ")", function(err, result){
        if(err) throw err;
        con.query("SELECT id FROM players WHERE firstName = '" + fname + "' AND lastName = '" + lname + "'", function(err, result){
          if(err) throw err;
          con.query("UPDATE users SET player = '" + result[0].id + "' WHERE id = '" + id + "'", function(err, result){
            if(err) throw err;
          });
            cb(new Player(fname, lname));
          })
        });
      }
    });
  }
  save(){
    
  }
}