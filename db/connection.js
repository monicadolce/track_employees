const mysql = require("mysql2");
const Connection = require("mysql2/typings/mysql/lib/Connection");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'tracker_db'
    },
    console.log(`Connected to tracker_db database.`)
  );

  Connection.connect(function (err) {
    if (err) throw err;
  });

  module.exports = connection;