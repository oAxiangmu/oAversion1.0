var connection=require("./connection.js");
var role={
	//数据添加
		add:function(data,callback){
			connection.query("insert into oa_role (name,creat_time) values(?,now())",data,function(err,result){
				callback(err,result);
			});

            },
	//判断角色是否已经存在
	isExesit:function (params,callback) {
		    var sql="";
		    if(params.name){
                 sql="select  id from oa_role where name="+params.name;
            }else{
                sql="select  id from oa_role where id="+params.id;
            }

        connection.query(sql,params,function(err,result){
            callback(err,result);
        });
    },
    //角色删除
    delet:function (data,callback) {
        connection.query("delete  from  oa_role where id=?",data,function(err,result){
            callback(err,result);
        });
    },

}
module.exports = role;