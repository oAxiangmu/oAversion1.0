var mysql  = require('mysql');  //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({    

    host     : '127.0.0.1',       //主机
    user     : 'root',            //MySQL认证用户名
    password:'12345678',
    port:   '3306',
    database: 'oa'

});

//创建一个connection
connection.connect(function(err){

    if(err){       
        return;

    }

}); 
module.exports =connection;
