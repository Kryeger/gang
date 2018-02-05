mysql = require('mysql');
var _ = require('underscore');

var con = mysql.createConnection({
  host: "den1.mysql5.gear.host",
  user: "gang",
  password: "browntacocat123!",
  database : 'gang'
});

module.exports = class Util{
  fetch(fields, source, conditions, cb){
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
  
  
  
}