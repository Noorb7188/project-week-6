const fs = require('fs');
const path = require('path');

const dbConnection = require('./db_connection.js');

const sqlPath = path.join(__dirname, 'db_build.sql');
const sql = fs.readFileSync(sqlPath).toString();

if ((process.env.NODE_END = "test")) {
  sql = fs.readFileSync(`${__dirname}/test_db_build.sql`).toString();
} else {
  sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();
}

const runDbBuild = cb => dbConnection.query(sql, cb)

module.exports = runDbBuild
