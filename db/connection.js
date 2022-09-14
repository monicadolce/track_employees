const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'tracker_db'
    },
    console.log(`Connected to tracker_db database.`)
  );

  connection.connect(function (err) {
    if (err) throw err;
  });

  module.exports = connection;