var query=require("./connection.js");
var logger= {
    //日志是否已经存在
    isExesit:function (params,callback) {

        var sql="select  id from oa_loggers  where id ="+params+" and is_del=0";

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

    //新增日志
    add:function(data,callback){
        var sql="insert into oa_loggers (title,content,send_id,rec_id,pos_time) values(?,?,?,?,now())";
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
    //日志删除
    delet:function (data,callback) {
        var sql="update  oa_loggers set is_del=1 where id=?";
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
    //日志列表
    list:function(data,callback){
        var sql="";
        var params=[data.start,data.pageSize];
        if(data.sendId){
         sql="select * from loggers_list where send_id="+data.sendId+" is_del=0 limit ?,?"
        }
        if(data.recId){
            sql="select * from loggers_list where rec_id="+data.recId+" is_del=0 limit ?,?"
        }
          sql="select * from loggers_list where  is_del=0 limit ?,?"

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
//查看日志
    view:function (data,callback) {
       var sql="select * from  loggers_list where is_del=0 and id=? ";

        query(function (err,conn) {
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,data,function(err,result){
                    console.log(result);
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    callback(err,result);
                });
            }
        });
    }



};
module.exports = logger;
