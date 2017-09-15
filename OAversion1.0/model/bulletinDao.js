var query=require("./connection.js");
var bulletin= {
    //判断公告是否已经存在
    isExesit:function (params,callback) {

            var sql="select  id from oa_bulletin  where id ="+params+" and is_del=0";
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

    //增加公告
     add:function(data,callback){
        var sql="insert into oa_bulletin (title,content,pusher_id,push_time) values(?,?,?,now())";
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
    //公告删除
    delet:function (data,callback) {
         var sql="update  oa_bulletin  set is_del=1 where id=?";
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
    //公告列表
    list:function(data,callback){
         var sql="select b.title, b.content, b.push_time,  u.name  pusher from oa_bulletin b  left join  oa_user  u  on b.pusher_id=u.id   where b.is_del=0  limit  ?,?  ";
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
//查看公告
    view:function (data,callback) {
        var sql="select b.title, b.content, b.push_time,  u.name  pusher from oa_bulletin b  left join  oa_user  u  on b.pusher_id=u.id   where b.is_del=0  and id=?  ";
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



};

module.exports = bulletin;
