var connection=require("./connection.js");
var news= {
    //判断新闻是否已经存在
    isExesit:function (params,callback) {

            var sql="select  id from oa_news  where id ="+params+" and is_del=0";

         connection.query(sql,function(err,result){
            callback(err,result);
        });
    },

    //增加新闻
     add:function(data,callback){
         connection.query("insert into oa_news (title,content,cate_id,author,push_time) values(?,?,?,?,now())",data,function(err,result){
             console.log(result);
             console.log(err);
             callback(err,result);
         });
    },
    //新闻删除
    delet:function (data,callback) {
        connection.query("update  oa_news set is_del=1 where id=?",data,function (error,result) {
            callback(error,result);
        })
    },
    //新闻列表
    list:function(data,callback){
        connection.query("select n.title, n.content, n.push_time, n.author , c.name cate  from oa_news n  left join  oa_news_category c  on n.cate_id=c.id   where n.is_del=0  limit  ?,?  ", data, function (err, rows) {
            callback(err, rows);
        });
    },
//查看新闻
    view:function (data,callback) {
        connection.query("select n.title, n.content, n.push_time, n.author , c.name cate  from oa_news n  left join  oa_news_category c  on n.cate_id=c.id   where n.is_del=0  and n.id=?  ", data, function (err, rows) {
            callback(err, rows);
        });

    }



};

module.exports = news;
