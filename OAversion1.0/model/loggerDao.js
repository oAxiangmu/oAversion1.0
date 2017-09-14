var query=require("./connection.js");
var logger= {
    //日志是否已经存在
    isExesit:function (params,callback) {

        var sql="select  id from oa_loggers  where id ="+params+" and is_del=0";

        query(sql,function(err,result){
            callback(err,result);
        });
    },

    //新增日志
    add:function(data,callback){
        query("insert into oa_loggers (title,content,send_id,rec_id,pos_time) values(?,?,?,?,now())",data,function(err,result){
            console.log(result);
            console.log(err);
            callback(err,result);
        });
    },
    //日志删除
    delet:function (data,callback) {
        query("update  oa_loggers set is_del=1 where id=?",data,function (error,result) {
            callback(error,result);
        })
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

        query(sql, params, function (err, rows) {
            callback(err, rows);
        });
    },
//查看日志
    view:function (data,callback) {
        query("select * from  loggers_list where is_del=0 and id=? ", data, function (err, rows) {
            callback(err, rows);
        });

    }



};
module.exports = logger;
