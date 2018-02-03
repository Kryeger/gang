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

//LOGGING

log.setLevel('warn');

process.on('uncaughtException', function (err) {
  log.warn("UncaughtException:" + err);
});

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
  
});

//CLASSES

class Companylist extends List{
  constructor(){
    super();
  }
  remove(companyid){
    this[companyid].disolve();
    this.splice(companyid, 1);
  }
  insert(company){
    this.push(company);
  }
}

class npcWorker{
  constructor(){
    this.gender = chance.gender();
    this.firstName = chance.first({gender: this.gender});
    this.lastName = chance.last({gender: this.gender});
    this.skill = chance.integer({min: 1, max: 100});
  }
  work(){
    return (this.skill * chance.floating({min:0.5, max: 2}));
  }
}

class NpcWorkerlist extends List{
  constructor(){
    super();
  }
  insert(npcWorker){
    this.push(npcWorker);
  }
  remove(npcworkerid){
    this[npcworkerid].fire();
    this[npcworkerid].splice(npcworkerid, 0);
  }
}

class Company{
  constructor(name, capital, founder /*, type*/){
    this.name = name;
    
    //id of the user
    
    this.founder = founder;
    this.capital = capital;
    //FIXME: change type
    this.type = "company";
    //private
    this._baseProfit = 10;
    this._npcWorkerList = new NpcWorkerlist();
  }
  //NOTE: just temp funcs to test stuff out
  earn(){
    var income = 0;
    //npc earnings
    _.forEach(this._npcWorkerList, function(el, index, list){
      income += el.work();
    });
    this.capital += income;
  }
  hireNpc(){
    this._npcWorkerList.insert(new npcWorker());
  }
  save(){
    
  }
  disolve(){
    //TODO:Stuff to do before deleting everything
  }
}

class Log{
  constructor(text){
    this.text = text;
  }
  print(){
    console.log(" -<Log>- \n" + this.text);
  }
}

class World{
  constructor(){
    //TODO: queries
    this.users = new Userlist;
    this.companies = new Companylist;
  }
  passTime(time){
    var interval = setInterval(function(){
      _.forEach(S.companies, function(el, index, list){
        el.earn(10);
      });
      if(!time--) clearInterval(interval);
    }, 1000);
  }
  static init(){
    //TODO: fetch info from db to populate the Lists
    
  }
}

class Item{
  constructor(type, count){
    //TODO: validation for types here
    this.type = type;
    this.count = count;
  }
}

//VARS

var S = new World();

//FUNC

setInterval(function(){
  S.passTime(1);
  console.log(S.users);
}, 5000);

function fetch(fields, source, conditions, cb){
  if(!fields || !source) return 0;
  var str = "SELECT " + fields.join() + " FROM " + source + " ";
  if(conditions.length){
    str += "WHERE";
    _.forEach(conditions, function(el, index, list){
      str += (" `" + el[0] + "` = " + con.escape(el[1])); 
      if(el.length == 3){
        //0 = AND, 1 = OR
        str += (el[2] == 0) ? " AND" : " OR";
      }
    });
  }
  var result = -1;
  con.query(str, function(err, result){
    if(err) throw err;
    cb(result);
  });
}

function validate(id, key){
  var index = _.where(S.users, {userid: parseInt(id)});
  if(index[0].userkey == key){
    return index;
  } return 0;
}

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
        io.to(socketid).emit("checkAccExists > cl", {error: 0});
        //logged in
        //users[result[0].id] = new User(result[0].id, result[0].username, socketid, 0);//TODO: handle player ids
        S.users.insert(result[0], socketid);
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
        io.to(socketid).emit("login > cl", {error: "User not found"});
        return 0;
      }
      data.password = encrypt(data.password + result[0].hash);
      if(data.password != result[0].password){
        io.to(socketid).emit("login > cl", {error: "Incorrect Password"});
      } else {
        io.to(socketid).emit("login > cl", {id: result[0].id, userkey: result[0].userkey, error: 0});
      }
      
    });
  });
  
  //LOGOUT
  
  socket.on("disconnect", function(){
    S.users.removeSocket(socket.id);
  });
  
  socket.on("logout > sv", function(userid){
    S.users.removeUser(userid);
  });
  
  socket.on("create company > sv", function(arr){
    var user = validate(arr[0].id, arr[0].key);
    if(user){
      S.companies.push(new Company(arr[1].name, arr[1].capital, user[0].player));
      user[0].player.ownedCompanies.push(S.companies.length - 1);
      console.log(_.where(S.companies, {founder: user[0]}));
      socket.to(socketid).emit("update company list > cl", _.where(S.companies, {founder: user[0]}));
    }
  })
});
