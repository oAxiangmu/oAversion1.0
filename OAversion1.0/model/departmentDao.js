var query=require("./connection.js");
var department={
    //部门查找
    list:function (data,callback) {

        var sql="select * from oa_department where is_del=0  limit  ?,? ";
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
    //数据添加
    add:function(data,callback){
        var sql="insert into oa_department  (name,no,p_id,remark,short) values(?,?,?,?,?)";
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
    //判断部门是否已经存在
    isExesit:function (params,callback) {
        var sql="";
        if(params.no){
            sql="select  id from oa_department where no='"+params.no+"'and is_del=0";
        }else{
            sql="select  id from oa_department where id="+params.id+" and is_del=0";
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
    //删除删除
    delet:function (data,callback) {
        var sql="delete from  oa_department where id=?";
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
//部门修改
    update:function (data,callback) {
        var sql="update oa_department  set name=?,no=?, p_id=? ,remark=?,short=?  where id=?";

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
}
module.exports = department;