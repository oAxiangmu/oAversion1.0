var query = require("./connection.js");
var category = {
    //数据添加
    add: function (data, callback) {

        query("insert into oa_news_category (p_id,name) values(?,?)", data, function (err, result) {

            callback(err, result);
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
        query(sql, params, function (err, result) {

            callback(err, result);
        });
    },

    //删除新闻类别
    delet: function (data, callback) {
        query("update oa_news_category set is_del=1 where id=?and is_del=0", data, function (err, result) {
            callback(err, result);
        })

    },
    //类别列表
    list: function (data, callback) {
        query("select  p_id,name from oa_news_category where is_del=0 limit ?,? ", data, function (err, result) {
            callback(err, result);
        })
    },

}
module.exports = category;