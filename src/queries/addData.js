const dbConnection = require('../database/db_connection.js');

const addData = (name, place, rating, cb) => {
  let dataArr = [];
  dbConnection.query(
    'INSERT INTO users (username) VALUES ($1)', [name],
    (err, resUsers) => {
      dataArr.push(resUsers);
     if (err) return (err);
    console.log('name inserted to users and the data i got is :', dataArr);
  });
    dbConnection.query(
      'INSERT INTO places (place_name) VALUES ($1)', [place],
      (err, resPlaces) => {
       if (err) return (err);
       dataArr.push(resPlaces);
      console.log('placeName inserted to places the data i get', dataArr);
    });
      dbConnection.query(
        'INSERT INTO ratings (rating) VALUES ($1)', [rating],
        (err, resRatings) => {
         if (err) return (err);
        console.log('rating inserted to ratings and the data i got ', dataArr);
        dataArr.push(resRatings);
      });
    cb(null, dataArr);
  };

  const addUsers = (name, pass, cb) => {
    dbConnection.query(
      'INSERT INTO userspass (userpassname, password) VALUES ($1, $2)', [name, pass],
      (err, res) => {
       if (err) return cb(err);
    });
    console.log('username and pass inserted to userspass table');
  cb(null, true);
  }

module.exports = {
  addData,
  addUsers
}
