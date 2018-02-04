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
    
    addMember(PlayerObj, depId){
        if(depId < 0 || depId >= this.depts.length) return 0;
        this.depts[depId].addMemberToDept(userId);
    }
    
    addDept(Dept){
        Dept.id = this.depts.length;
        this.depts.push(Dept);
    }
    
    removeMember(memId, depId = -1){
        if(depId == -1){
            for(var i = 0; i < this.depts.length; ++i){
                if(this.depts[i].removeFromDept(memId)) return 1;
            }
        }
        if(depId < -1 || depId >= this.depts.length) return 0;
        return this.depts[depId].removeFromDept(memId);
    }
    
    // getters
    
    getMoney(){
        var totalMoney = 0;
        for(var i = 0; i < this.depts.length; ++i){
            totalMoney += this.depts[i].money;
        }
        return totalMoney;
    }
    
    getMembers(){
        var allMembers = [];
        for(var i = 0; i < this.depts.length; ++i){
            allMembers = allMembers.concat(this.depts[i].members);
        }
        return allMembers;
    }
    
}