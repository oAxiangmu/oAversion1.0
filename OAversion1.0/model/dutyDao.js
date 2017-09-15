var query=require("./connection.js");
var duty={
    //职位查找
    list:function (data,callback) {
        var sql="select * from oa_duty where is_del=0  limit  ?,? ";
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

        var sql="insert into oa_duty (name,no) values(?,?)";
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
    //判断职位编号是否已经存在
    isExesit:function (params,callback) {
        var sql="";
        if(params.no){
            sql="select  id from oa_duty where no='"+params.no+"'and is_del=0";
        }else{
            sql="select  id from oa_duty where id="+params.id+" and is_del=0";
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
    //职位删除
    delet:function (data,callback) {
        var sql="update oa_duty  set is_del=1 where id=?";
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
//职位修改
    update:function (data,callback) {
        var sql="update oa_duty set name=?,no=? where id=?";
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
module.exports = duty;