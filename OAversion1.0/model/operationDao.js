var query=require("./connection.js");
var operation={
    //查找
    list:function (data,callback) {
        query("select * from oa_operation where is_del=0  limit  ?,? ", data, function (err, rows) {
            callback(err, rows);
        });
    },
    //数据添加
    add:function(data,callback){
        query("insert into oa_operation  (name,url,p_id) values(?,?,?)",data,function(err,result){
            callback(err,result);
        });
    },
    //判断是否已经存在
    isExesit:function (params,callback) {
        var sql="";
        if(params.name){
            sql="select  id from oa_operation  where name='"+params.name+"'and is_del=0";
        }else{
            sql="select  id from oa_operation where id="+params.id+" and is_del=0";
        }

        query(sql,params,function(err,result){
            callback(err,result);
        });
    },
    //删除
    delet:function (data,callback) {
        query("delete from  oa_operation where id=?",data,function(err,result){
            callback(err,result);
        });
    },
//修改
    update:function (data,callbak) {

        query("update oa_operation  set name=?,url=?, p_id=?  where id=?",data,function(err,result){
            callback(err,result);
        });
    }
}
module.exports = operation;