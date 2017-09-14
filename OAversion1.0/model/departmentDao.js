var query=require("./connection.js");
var department={
    //部门查找
    list:function (data,callback) {
        query("select * from oa_department where is_del=0  limit  ?,? ", data, function (err, rows) {
            callback(err, rows);
        });
    },
    //数据添加
    add:function(data,callback){
        query("insert into oa_department  (name,no,p_id,remark,short) values(?,?,?,?,?)",data,function(err,result){
            callback(err,result);
        });

    },
    //判断部门是否已经存在
    isExesit:function (params,callback) {
        var sql="";
        if(params.no){
            sql="select  id from oa_department where no='"+params.no+"'and is_del=0";
        }else{
            sql="select  id from oa_department where id="+params.id+" and is_del=0";
        }

        query(sql,params,function(err,result){
            callback(err,result);
        });
    },
    //删除删除
    delet:function (data,callback) {
        query("delete from  oa_department where id=?",data,function(err,result){
            callback(err,result);
        });
    },
//部门修改
    update:function (data,callbak) {

        query("update oa_department  set name=?,no=?, p_id=? ,remark=?,short=?  where id=?",data,function(err,result){
            callback(err,result);
        });
    }
}
module.exports = department;