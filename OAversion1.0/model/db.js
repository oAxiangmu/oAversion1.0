var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'oa',
    port: 3308
});
conn.connect();
module.exports =conn;