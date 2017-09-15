var query=require("./connection.js");
var connection=require("./db.js");
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
    add:function(data,callback) {
        var sql="insert into oa_conference (title,content,pusher_id,address,start,end,u_id,push_time) values(?,?,?,?,?,?,?,now())";
        query(function (err,conn) {
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql, data,function(err,result){
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    callback(err,result);
                });
            }
        });




    },
    //会议删除

    delet:function(data,callback) {
        var sql="update oa_conference set is_del=1 where id=?";
        query(function (err,conn) {
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql, data,function(err,result){
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    callback(err,result);
                });
            }
        });
    },
    //会议列表
    
    list:function (data,callback) {
        var sql="select * from oa_conference where is_del=0 limit ?,?";
        query(function (err,conn) {
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql, data,function(err,result){
                    //释放连接
                    conn.release();
                    //事件驱动回调
                    callback(err,result);
                });
            }
        });
        
    },
    //查看会议
    view:function (data,callback) {
        var tasks = [function(bc) {
            connection.beginTransaction(function(err) {
                bc(err);
            });
        }, function(bc) {
            var sql="select * from oa_conference where id=?"
            connection.query(sql, data, function(err, result) {
                bc(err, result[0].u_id); // 查到的uId会传给下一个任务
            });
        }, function(uId, bc) {


            connection.query('select name from oa_user where id in (?) ', uId, function(err, result) {
                bc(err);
            });
        }, function(bc) {
            connection.commit(function(err) {
                bc(err);
            });
        }];

        async.waterfall(tasks, function(err, results) {
            if(err) {
                console.log(err);
                connection.rollback(); // 发生错误事务回滚
            }
            callback(err,results);
        });
        
    }



};

module.exports  = conference;
