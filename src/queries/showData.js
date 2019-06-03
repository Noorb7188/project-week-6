const dbConnection = require('../database/db_connection.js');

const showData = (cb) => {
  dbConnection.query('SELECT username FROM users UNION SELECT place_name FROM places', (err, res) => {
    if (err) return cb(err);
    cb(null, JSON.stringify(res.rows));
  });
};

const showUsers = (userName, cb) => {
 dbConnection.query(`SELECT password FROM userspass WHERE userpassname = ($1)`, [userName],  (err, res) => {
    if (err) return cb(err);
    let passFromData = res.rows[0].password;
    return passFromData;
  });
};

module.exports = {
  showData,
  showUsers
}
