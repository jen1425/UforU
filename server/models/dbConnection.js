var mysql = require('mysql');

var connection = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

// connection.connect(); || {host: '127.0.0.1', user: 'root', password: '', database: 'UFORU'}

module.exports.connection = connection;