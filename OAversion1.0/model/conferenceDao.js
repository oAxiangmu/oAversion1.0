var query=require("./connection.js");
var async=require("async");
var conference= {
    //判断会议是否已经存在
    isExesit:function (params,callback) {
        var sql="select  id from oa_conference  where id ="+params+" and is_del=0";
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

    //发布会议
    add:function(data,callback){
        var  conference=[data.title,data.content,data.adress,data.pusherId,data.start,data.end];

        var tasks = [function(bc) {
            connection.beginTransaction(function(err) {
                bc(err);
            });
        }, function(bc) {
            connection.query('INSERT INTO oa_conference (title,content,adress,pusher_id,start,end,push_time) values (?,?,?,?,?,?,now())', conference, function(err, result) {
                bc(err, result.insertId); // 生成的ID会传给下一个任务
            });
        }, function(insertId, bc) {
            // 接收到上一条任务生成的ID
            var log =insertId
            connection.query('INSERT INTO  oa_ conference_join () values ()', log, function(err, result) {
                bc(err);
            });
        }, function(callback) {
            connection.commit(function(err) {
                callback(err);
            });
        }];

        async.waterfall(tasks, function(err, results) {
            if(err) {
                console.log(err);
                connection.rollback(); // 发生错误事务回滚
            }
            connection.end();
        });


        query("insert into oa_conference  (title,content,pusher_id,push_time) values(?,?,?,now())",data,function(err,result){

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
