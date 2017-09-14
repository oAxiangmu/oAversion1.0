var query=require("./connection.js");
var leave= {
    //假条是否已经存在
    isExesit:function (params,callback) {

        var sql="select  id from oa_leave where id ="+params+" and is_del=0";

        query(sql,function(err,result){
            callback(err,result);
        });
    },

    //新增假条
    add:function(data,callback){
        query("insert into oa_leave (title,category,reason,start,end,send_id,rec_id,pos_time) values(?,?,?,?,?,?,?,now())",data,function(err,result){
            console.log(result);
            console.log(err);
            callback(err,result);
        });
    },
    //假条删除
    delet:function (data,callback) {
        query("update  oa_leave set is_del=1 where id=?",data,function (error,result) {
            callback(error,result);
        })
    },
    //假条列表
    list:function(data,callback){
        var sql="";
        var params=[data.start,data.pageSize];
        if(data.sendId){
         sql="select * from leaves_list where send_id="+data.sendId+" is_del=0 limit ?,?"
        }
        if(data.recId){
            sql="select * from leaves_list where rec_id="+data.recId+" is_del=0 limit ?,?"
        }
        sql="select * from leaves_list where  is_del=0 limit ?,?"

        query(sql, params, function (err, rows) {
            callback(err, rows);
        });
    },
//查看假条
    view:function (data,callback) {
        query("select * from  leaves_list  where is_del=0 and id=? ", data, function (err, rows) {
            callback(err, rows);
        });

    }



};
module.exports = leave;
