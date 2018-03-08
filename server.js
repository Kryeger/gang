var app = require('express')();
var express = require('express');
app.use(express.static('public'));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var path = require('path');
var _ = require('underscore');
const log = require('simple-node-logger').createSimpleLogger('project.log');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';
var async = require('async');
var Chance = require('chance');
chance = new Chance();
var crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'Qqo*o[{MYFx<fwrq[4/\$7^J[PBR<==DnN?JO*tW{C*"WY1R}jCK]%7%WOy}i%r';

//FILES

const Player = require("./private/js/Player.js");
const User = require("./private/js/User.js");
const List = require("./private/js/List.js");
const Userlist = require("./private/js/Userlist.js");
const Util = require("./private/js/Util.js");
const Company = require("./private/js/Company.js");
const Companylist = require("./private/js/Companylist.js");
const Faction = require("./private/js/Faction.js");
const Factionlist = require("./private/js/Factionlist.js");
const Department = require("./private/js/Department.js");
const World = require("./private/js/World.js");
const Businesslist = require("./private/js/Businesslist.js");
const Business = require("./private/js/Business.js");

//LOGGING

log.setLevel('warn');

//process.on('uncaughtException', function (err) {
//  log.warn("UncaughtException:" + err);
//});

//CRYPTO

function encrypt(text){
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}

//MYSQL

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
  console.log("Connected!");
//  var myuser;
//  fetch(["username", "hash", "userkey"], "users", [["id", 1]], function(result){
//    myuser = result;
    //  });
    
    var Fact = new Faction(0, "Some Gang", 2, 1);
    var Fact1 = new Faction(0, "Some Gang", 2, 1);
    var Fact2 = new Faction(0, "Some Gang", 2, 1);
    var FL = new Factionlist();
    FL.insert(Fact);
    FL.insert(Fact1);
    FL.insert(Fact2);
    FL.remove('name', 'Some Gang', 0);
    console.log("FL: ", FL);
  
});

//CLASSES

//VARS

S = new World();
U = new Util();

//FUNC

setInterval(function(){
  console.log(S);
}, 5000);

//MAIN

//S.init();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(80, function(){
  console.log('listening on *:80');
});

io.on('connection', function(socket){
  var socketid = socket.id;
  io.to(socketid).emit('send dirname', __dirname);

  //REGISTER
  
  socket.on("register > sv", function(data){
    con.query("SELECT * FROM users WHERE username = "+ con.escape(data.username), function(err, result){
      if(err) throw err;
      if(result.length){
        io.to(socketid).emit("register > cl", {error: "Username Taken"});
      } else {
        var userkey = chance.string({length: 32});
        var hash = chance.string({length: 64 - data.password.length});
        data.password = encrypt(data.password + hash);
        
        con.query("INSERT INTO users (`username`, `password`, `hash`, `userkey`) VALUES (" + con.escape(data.username) + ",'" + data.password + "','" + hash + "','" + userkey + "')", function(err, result){
          if(err) throw err;
          con.query("SELECT id FROM users WHERE username = " + con.escape(data.username), function(err, result){
            io.to(socketid).emit("login > cl", {id: result[0].id, userkey: userkey, error: 0});
          });
        });   
      }
    });
    
  });
  
  //CHECK IF ACCOUNT EXISTS
  
  socket.on("checkAccExists > sv", function(data){
    data.userid = con.escape(data.userid);
    data.userkey = con.escape(data.userkey);
    con.query("SELECT * FROM users WHERE id = " + data.userid + " AND userkey = " + data.userkey, function (err, result){
      if(err) throw err;
      if(result.length){
        io.to(socketid).emit("checkAccExists > cl", {error: 0, username: result[0].username});
        //logged in
        //users[result[0].id] = new User(result[0].id, result[0].username, socketid, 0);//TODO: handle player ids
        S.insertSocket(result[0], socketid);
      } else {
        io.to(socketid).emit("checkAccExists > cl", {error: "Error"});
      }
    });
  });
  
  //LOGIN
  
  socket.on("login > sv", function(data){
    data.username = con.escape(data.username);
    con.query("SELECT * FROM users WHERE username = "+ data.username, function(err, result){
      if(err) throw err;
      if(!result.length){
          io.to(socketid).emit("login > cl", {errorAt: "username", error: "User not found"});
        return 0;
      }
      data.password = encrypt(data.password + result[0].hash);
      if(data.password != result[0].password){
        io.to(socketid).emit("login > cl", {errorAt: "password", error: "Incorrect Password"});
      } else {
        io.to(socketid).emit("login > cl", {id: result[0].id, userkey: result[0].userkey, rememberMe: data.rememberMe, error: 0});
      }
      
    });
  });
  
  //LOGOUT
  
  socket.on("disconnect", function(){
    S.removeSocket(socket.id);
  });
  
  socket.on("logout > sv", function(userid){
    S.removeUser(userid);
  });
  
  socket.on("create company > sv", function(arr){
    var user = S.validate(arr[0]);
  });
    
  //BUSINESS
  
  socket.on("create business > sv", function(arr){
    var user = S.validate(arr[0]);
    if(user){
      S.createNewBusiness(user, arr[1].name, arr[1].capital, arr[1].type);
    }
  });
  
  socket.on("refresh business list > sv", function(arr){
    var user = S.validate(arr[0]);
    if(user){
      io.to(socketid).emit("refresh business list > cl", S.printBusinessList(arr[1].all));
    }
  });
    //CHANGELOG

    var fs = require('fs');
    socket.on("changelog > sv", function(data){ //SAVE
        fs.writeFile("./public/js/changelog/changelogDB.js", data.content, (err) => {
            if (err) throw err;
            io.emit("changelog update > cl", {success: 1, changelog: data.changelog});
        });
    });
});

