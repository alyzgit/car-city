// get the client
const mysql = require('mysql2');


// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'db4free.net',
    port:3306,
    user: 'alyz123', //Change this to your username of your account on the cloud database website that has the SQL dump
    password:"heated2345",//Change this to your password of your account on the cloud database website that has the SQL dump
    database: 'carcity123',//Change this to your database name (must match the name on the cloud database) 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


 module.exports = pool;