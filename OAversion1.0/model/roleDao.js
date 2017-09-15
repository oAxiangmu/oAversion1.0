var query=require("./connection.js");
var role={
    //角色查找
       list:function (data,callback) {
           query(function (err,conn) {
               if(err){
                   callback(err,null,null);
               }else{
                   conn.query("select * from oa_role where is_del=0  limit  ?,? ",data,function(err,result){
                       //释放连接
                       conn.release();
                       //事件驱动回调
                       callback(err,result);
                   });
               }
           });

       },
	//数据添加
		add:function(data,callback){
            query(function (err,conn) {
                if(err){
                    callback(err,null,null);
                }else{
                    conn.query("insert into oa_role (name,creat_time) values(?,now())",data,function(err,result){
                        //释放连接
                        conn.release();
                        //事件驱动回调
                        callback(err,result);
                    });
                }
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

        query(function (err,conn) {
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,function(err,result){
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    callback(err,result);
                });
            }
        });
    },
    //角色删除
    delet:function (data,callback) {
        var sql="delet from oa_role  where id=?";
        query(function (err,conn) {
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,data,function(err,result){
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    callback(err,result);
                });
            }
        });
    },
//角色修改
    update:function (data,callback) {
        query(function (err,conn) {
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,data,function(err,result){
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    callback(err,result);
                });
            }
        });
    }
}
module.exports = role;