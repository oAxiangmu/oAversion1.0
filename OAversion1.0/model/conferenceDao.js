var connection=require("./connection.js");
var conference={

	//数据添加
	add:function(data,callback){
		
		connection.query("insert into oa_conference (title,content,pusher_id,adress,start,end,push_time) values(?,?,?,?,?,?,now())",data,function(err,result){
			callback(err,result);
		})
	},
	

	isExesit:function (params,callback) {
	    var sql="";
	    if(params.name){
            sql="select  id from oa_conference where id="+params.id;
        }

	    connection.query(sql,params,function(err,result){
	    	callback(err,result);
    	})
	},
	
	//角色删除
    delet:function (data,callback) {
        connection.query("delete  from  oa_conference where id=? ",data,function(err,result){
            callback(err,result);
        });
    },

	
	
    //修改角色
  	update:function(data,callback){
  		connection.query( "update oa_conference set title = ?,content=?,pusher_id=?,adress=?,start=?,end=? where id=?",data,function(err,result){
  	        callback(err,result);
  	    });	
  	 },
  	 
  	 //角色查找
     list:function (data,callback) {
         connection.query("select * from oa_conference where is_del=0  limit  ?,? ", data, function (err, rows) {
             callback(err, rows);
         });
  	},
  	 

};	
module.exports = conference;









