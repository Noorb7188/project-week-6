const dbConnection = require('../database/db_connection.js');

const addData = (name, cb) => {
  console.log('add data is working');
  dbConnection.query(
    "INSERT INTO users (user_id, username) VALUES (1, 'noor');"",
    (err, res) => {
     if (err) return cb(err);
    console.log('res is :', res);
    cb(null, res);
  }
 );
};

module.exports = addData;
