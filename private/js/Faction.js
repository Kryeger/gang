mysql = require('mysql');
const Util = require("./Util.js");
const Player = require("./Player.js");
const Department = require("./Department.js");
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

module.exports = class Faction{
    
    constructor(id, factionname, leaderid, type, departments = [new Department]){
        this.id = id;
        this.name = factionname;
        this.leader = leaderid;
        this.type = type; // 0 - legal / 1 - illegal
        this.depts = departments; // array of Department(s)
    }
    
    addMember(userId, depId){
        this.depts[depId].addMemberToDep(userId);
    }
    
    addDept(Dept){
        Dept.id = this.depts.length;
        this.depts.push(Dept);
    }
    
}