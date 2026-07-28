const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool(
    process.env.MYSQL_PUBLIC_URL
//     {
    
//     // host: process.env.MYSQL_HOST,
//     // port: process.env.MYSQL_PORT,
//     // user: process.env.MYSQL_USER,
//     // password: process.env.MYSQL_PASSWORD,
//     // database: process.env.MYSQL_DATABASE
// }
).promise()


module.exports = pool