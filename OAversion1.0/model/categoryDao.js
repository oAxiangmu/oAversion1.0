var query = require("./connection.js");
var category = {
    //数据添加
    add: function (data, callback) {
        var sql="insert into oa_news_category (p_id,name) values(?,?)";

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
    //判断类别是否已经存在
    isExesit: function (params, callback) {
        var sql = "";
        if (params.name) {
            sql = "select id from oa_news_category where name='" + params.name + "'and is_del=0";
        } else {
            sql = "select id from oa_news_category  where id=" + params.id + " and is_del=0";
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

    //删除新闻类别
    delet: function (data, callback) {

        var sql="update oa_news_category set is_del=1 where id=?and is_del=0";
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
    //类别列表
    list: function (data, callback) {
        var sql="select  p_id,name from oa_news_category where is_del=0 limit ?,? ";
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

}
module.exports = category;