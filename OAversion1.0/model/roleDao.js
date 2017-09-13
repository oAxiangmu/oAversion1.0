var query=require("./connection.js");
var role={
    //角色查找
       list:function (data,callback) {
         query("select * from oa_role where is_del=0  limit  ?,? ", data, function (err, rows) {
               callback(err, rows);
           });
       },
	//数据添加
		add:function(data,callback){
		   query("insert into oa_role (name,creat_time) values(?,now())",data,function(err,result){
				callback(err,result);
			});

            },
	//判断角色是否已经存在
	isExesit:function (params,callback) {
		    var sql="";
		    if(params.name){
                 sql="select  id from oa_role where name='"+params.name+"'and is_del=0";
            }else{
                sql="select  id from oa_role where id="+params.id+" and is_del=0";
            }

        query(sql,params,function(err,result){
            callback(err,result);
        });
    },
    //角色删除
    delet:function (data,callback) {
          query("update oa_role  set is_del=1 where id=?",data,function(err,result){
            callback(err,result);
        });
    },
//角色修改
    update:function (data,callbak) {

          query("update oa_role  set name=?  where id=?",data,function(err,result){
            callback(err,result);
        });
    }
}
module.exports = role;