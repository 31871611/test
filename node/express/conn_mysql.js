/*

    npm install --save-dev mysql

*/


var mysql = require('mysql');

/*

// 连接数据库
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'    //数据库名
});

connection.connect();


//查询
connection.query('select * from user',function(err,rows,fields){
    if(err) throw err;
    console.log(rows);
});



//关闭连接
connection.end();

*/


var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'    //数据库名
});

pool.getConnection(function(err,conn){
    if(err) throw err;
    conn.query('select * from user',function(qerr,rows,fields){
        if(qerr) throw qerr;
        // 释放连接
        conn.release();
        // 数据
        console.log(rows);
        // 断开连接.案例中没有
        //pool.end();
    })
});



/*

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'    //数据库名
});

var query = function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,rows,fields){
                // 释放连接
                conn.release();
                // 事件驱动回调
                callback(qerr,rows,fields);
            })
        }
    })
};

// 公开
module.exports = query;

// 在jd类使用如下

var query=require("./lib/mysql.js");

query("select 1 from 1",function(err,rows,fields){
    //do something
});

*/




