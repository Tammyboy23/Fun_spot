const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tamilore',
    database: 'fun'
}).promise()

module.exports = pool