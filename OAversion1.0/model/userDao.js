var query=require("./connection.js");
var user={
    //用户列表
    list:function (data,callback) {
        var sql="select * from userList  limit  ?,? ";
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
        var sql="insert into oa_user  (name,gender,no,letter,password,rol_id,du_id,dep_id,email,avatar, mobile_tel,office_tel,create_time) values(?,?,?,?,?,?,?,?,?,?,?,?,now())";
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
    //判断用户是否已经存在
    isExesit:function (params,callback) {
        var sql="";
        if(params.no){
            sql="select  id from oa_user where no='"+params.no;
        }else{
            sql="select  id from oa_user where id="+params.id;
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
    //删除用户
    delet:function (data,callback) {
        var sql="delete from  oa_user where id=?";
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
//用户基本信息修改
    update:function (data,callback) {
        var sql="update oa_user  set name=?,gender=?,letter=?,rol_id=?, du_id=?,dep_id=?,email=?,no=?, homecity=? ,mobile_tel=?,offcie_tel=? where id=?";

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
    //用户登录验证
    loginValidate:function (data,callback) {
        var sql="select id where name=? and password=?";
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
    //查找用户
    view:function (params,callback) {
        var sql="";
        if (params.id) {
            sql = "select * from userList where id="+params.id;
        }else{
            sql="select * from userList where  name='"+params.name+" 'and password='"+params.password+"'";
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

}

module.exports = user;