const dbConnection = require('../database/db_connection');

const showData = (cb) => {
  dbConnection.query('SELECT * FROM users;', (err, res) => {
    if (err) return cb(err);
    console.log('res.rows:', res.rows);
    cb(null, res.rows);
  });
};

module.exports = showData;
