var connection=require("./connection.js");
var category={
    //数据添加
    add:function(data,callback){
        connection.query("insert into oa_news_category (pid,name) values(?,?)",data,function(err,result){
            callback(err,result);
        });

    },
    //判断类别是否已经存在
    isExesit:function (params,callback) {
        var sql="";
        if(params.name){
            sql="select  id from oa_news_category where name='"+params.name+"'and is_del=0";
        }else{
            sql="select  id from oa_news_category  where id="+params.id+" and is_del=0";
        }

        connection.query(sql,params,function(err,result){
            callback(err,result);
        });
    },
}
module.exports = category;