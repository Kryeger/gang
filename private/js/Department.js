module.exports = class Department{

    constructor(depname = "Main", members = [], money = 1000, depId = 0){
        this.id = depId;
        this.name = depname;
        this.members = members;
        this.money = money;
    }

    addMemberToDep(memid){
        this.members.push(memid);
    }

}