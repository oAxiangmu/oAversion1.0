var connection=require("./connection.js");
var role={
		add:function(data,callback){
			connection.query("insert into oa_role (name) values(?)",data,function(err,result){
				callback(err,result);
			});
		}
}
module.exports = role;