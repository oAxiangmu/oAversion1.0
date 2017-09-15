var query=require("./connection.js");
var news= {
    //判断新闻是否已经存在
    isExesit:function (params,callback) {

            var sql="select  id from oa_news  where id ="+params+" and is_del=0";
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

    //增加新闻
     add:function(data,callback){
        var sql="insert into oa_news (title,content,cate_id,author,push_time) values(?,?,?,?,now())"
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
    //新闻删除
    delet:function (data,callback) {

        var sql="update  oa_news set is_del=1 where id=?";
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
    //新闻列表
    list:function(data,callback){

   var sql="select n.title, n.content, n.push_time, n.author , c.name cate  from oa_news n  left join  oa_news_category c  on n.cate_id=c.id   where n.is_del=0  limit  ?,?  ";
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
//查看新闻
    view:function (data,callback) {
        var sql="select n.title, n.content, n.push_time, n.author , c.name cate  from oa_news n  left join  oa_news_category c  on n.cate_id=c.id   where n.is_del=0  and n.id=?  ";

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

module.exports = news;
