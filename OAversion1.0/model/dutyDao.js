var query=require("./connection.js");
var duty={
    //职位查找
    list:function (data,callback) {
        query("select * from oa_duty where is_del=0  limit  ?,? ", data, function (err, rows) {
            callback(err, rows);
        });
    },
    //数据添加
    add:function(data,callback){
        query("insert into oa_duty (name,no) values(?,?)",data,function(err,result){
            callback(err,result);
        });

    },
    //判断职位编号是否已经存在
    isExesit:function (params,callback) {
        var sql="";
        if(params.no){
            sql="select  id from oa_duty where no='"+params.no+"'and is_del=0";
        }else{
            sql="select  id from oa_duty where id="+params.id+" and is_del=0";
        }

        query(sql,params,function(err,result){
            callback(err,result);
        });
    },
    //职位删除
    delet:function (data,callback) {
        query("update oa_duty  set is_del=1 where id=?",data,function(err,result){
            callback(err,result);
        });
    },
//职位修改
    update:function (data,callbak) {

        query("update oa_duty set name=?,no=? where id=?",data,function(err,result){
            callback(err,result);
        });
    }
}
module.exports = duty;