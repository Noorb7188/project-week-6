const dbConnection = require('../database/db_connection.js');

const addData = (name, author, cb) => {
  dbConnection.query(
    'INSERT INTO users (name, author) VALUES ($1, $2)',
    [name, location],
    (err, res) => {
     if (err) return cb(err);
    console.log('res is :', res);
    cb(null, res);
  }
 );
};

module.exports = addData;
