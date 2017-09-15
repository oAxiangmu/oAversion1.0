var mysql=require("mysql");
//创建连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'oa',
    port: 3306
});

var query=function(callback){
    pool.getConnection(function(err,conn){
        callback(err,conn);
    });
};



module.exports=query;
