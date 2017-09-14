var query=require("./connection.js");
var bulletin= {
    //判断公告是否已经存在
    isExesit:function (params,callback) {

            var sql="select  id from oa_bulletin  where id ="+params+" and is_del=0";

            query(sql,function(err,result){
            callback(err,result);
        });
    },

    //增加公告
     add:function(data,callback){
            query("insert into oa_bulletin (title,content,pusher_id,push_time) values(?,?,?,now())",data,function(err,result){

             callback(err,result);
         });
    },
    //公告删除
    delet:function (data,callback) {
          query("update  oa_bulletin  set is_del=1 where id=?",data,function (error,result) {
            callback(error,result);
        })
    },
    //公告列表
    list:function(data,callback){
           query("select b.title, b.content, b.push_time,  u.name  pusher from oa_bulletin b  left join  oa_user  u  on b.pusher_id=u.id   where b.is_del=0  limit  ?,?  ", data, function (err, rows) {
            callback(err, rows);
        });
    },
//查看公告
    view:function (data,callback) {
           query("select b.title, b.content, b.push_time,  u.name  pusher from oa_bulletin b  left join  oa_user  u  on b.pusher_id=u.id   where b.is_del=0  and id=?  ", data, function (err, rows) {
            callback(err, rows);
        });

    }



};

module.exports = bulletin;
