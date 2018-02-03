module.exports = class Department{

    constructor(depname = "Main", members = [], depId = 0){
        this.id = depId;
        this.name = depname;
        this.members = members;
    }

    addMemberToDep(memid){
        this.members.push(memid);
    }

}