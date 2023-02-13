const mysql = require('mysql');
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: '01_db',
    // 导入数据库的时候尾部需要写,
})


module.exports = db;