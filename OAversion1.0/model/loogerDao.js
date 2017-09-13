var query=require("./connection.js");
var logger= {
    //判断日志是否已经存在
    isExesit:function (params,callback) {

            var sql="select  id from oa_loggers  where id ="+params+" and is_del=0";

            query(sql,function(err,result){
            callback(err,result);
        });
    },

    //发布日志
     add:function(data,callback){
            query("insert into oa_loggers (title,content,send_id,rec_id,post_time) values(?,?,?,?,now())",data,function(err,result){
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
         var sql="select l.title, l.content, l.post_time, s.name , r.name  from oa_loggers l  left join  oa_user s  on l.send_id=s.id  left join oa_user r on r.id=l.rec_id   where l.is_del=0  limit  ?,?  ";
           query(sql, data, function (err, rows) {
            callback(err, rows);
        });
    },
//查看日志
    view:function (data,callback) {
        var sql="select l.title, l.content, l.post_time, s.name , r.name  from oa_loggers l  left join  oa_user s  on l.send_id=s.id  left join oa_user r on r.id=l.rec_id   where l.is_del=0  and n.id=? ";
           query(sql, data, function (err, rows) {
            callback(err, rows);
        });

    }



};

module.exports =logger ;
