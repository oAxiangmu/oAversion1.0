var query=require("./connection.js");
var operation={
    //查找
    list:function (data,callback) {

        var sql="select * from oa_operation where is_del=0  limit  ?,? ";
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
    //数据添加
    add:function(data,callback){

        var sql="insert into oa_operation  (name,url,p_id) values(?,?,?)";
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
    //判断是否已经存在
    isExesit:function (params,callback) {
        var sql="";
        if(params.name){
            sql="select  id from oa_operation  where name='"+params.name+"'and is_del=0";
        }else{
            sql="select  id from oa_operation where id="+params.id+" and is_del=0";
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
    //删除
    delet:function (data,callback) {

        var sql="delete from  oa_operation where id=?"
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
//修改
    update:function (data,callback) {
        var sql="update oa_operation  set name=?,url=?, p_id=?  where id=?"

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
module.exports = operation;