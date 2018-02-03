module.exports = class Department{

    constructor(depname = "Main", members = [], deptLead = -1, money = 1000, depId = 0){
        this.id = depId; // id of the department | default: 0
        this.name = depname; // name of the department | default: "Main"
        this.members = members; // array of Player ids | default: []
        this.leader = deptLead; // department leader | default: -1 = no leader, so the faction leader will act as one
        this.money = money;
    }

    addMemberToDep(memid){
        this.members.push(memid);
    }

}