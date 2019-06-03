const { readFile } = require('fs');
const path = require('path');
const querystring = require('querystring');
const {hash,
      compare } = require('bcryptjs');
const { sign,
        verify } = require('jsonwebtoken');
const { showData,
        showUsers} = require('./queries/showData.js');
const { addData,
        addUsers }= require('./queries/addData.js');
const { parse } = require('cookie');

const serverError = (err, response) => {
  response.writeHead(500, 'Content-Type:text/html');
  response.end('<h1>Sorry, there was the server</h1>');
  console.log(err);
};

const homeHandler = response => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  readFile(filePath, (err, file) => {
    if (err) return serverError(err, response);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    });
  };

const signUpHandler = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'signup.html');
  readFile(filePath, (err, file) => {
    if (err) return serverError(err, response);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    });
  };

const getUsersHandler = response => {
showData((err, users) => {
  if (err) return serverError(err, response);
  //let usersData = JSON.stringify(users);
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(users);
});
};

const signUpFormHandler = (request, response) => {
  let allData = '';
  request.on("data", (chunkData) => {
    allData+=chunkData;
  });
  request.on('end', () => {
    const { user, pass, conPass } = querystring.parse(allData);
    if (pass !== conPass) {
      response.writeHead(403, {'Content-Type' : 'text/html'});
      response.end('<h1> Passwords Do Not Match !! </h1>');
    }
    hash(pass, 10, (hashERR, hashedPass) => {
      if (hashERR) return serverError(err, response);
      addUsers(user, hashedPass, (err, res)=> {
        if (err) serverError(err, response);
        console.log('my hashed pass', hashedPass);
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end('Succeccully Signed Up ! <a href="/"><button> Back </button></a>');
      })
    })
   })
};

const loginHandler = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'login.html');
  readFile(filePath, (err, file) => {
    if (err) return serverError(err, response);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    });
};

const addDataHandler = (request, response) => {
    const filePath = path.join(__dirname, '..', 'public', 'dataForm.html');
    readFile(filePath, (err, file) => {
      if (err) return serverError(err, response);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(file);
      });
  };

const loginFormHandler = (request, response) => {
    let body = '';
    request.on('data', (data) => {
      body += data.toString();
      request.on('end', () => {
        const { userName, password } = querystring.parse(body);
// i want to compare my pass from data with the one in the input so i can continue with adding a cookie and moving to the next page !
        showUsers(userName, (err, passFromData) => {
          console.log('my passinData', passFromData);
          if (err) return serverError(err, response);
          compare(password, passFromData, (err, result) => {
            console.log('my pass in data', passFromData);
            if (err) serverError(err, response);
            sign(password, process.env.SECRET, (err, token) => {
                if (err) return serverError(err, response);
                response.writeHead(200, {'Set-Cookie' : `signup=${token}; httpOnly`,
                                         'Content-Type' : 'text/html'});
              })
              if (request.headers.cookie) {
                let parsedCookie = parse(request.headers.cookie);
                console.log('my parsed cookie', parsedCookie);
                verify(parsedCookie.signup, process.env.SECRET, (err, res) => {
                  if (err) serverError(err, response);
                  response.writeHead(200, {'Content-Type' : 'text/html'});
                  response.end('You can add your data now :) ! <a href="/add-data"><button> Go To Form </button></a>');
                  return;
                })
               }
          })
        })
         })
       })
    };

const createUserHandler = (request, response) => {
let allData = '';
request.on('data', chunkData => {
  allData+= chunkData;
});
request.on('end', () => {
  const convertedData = querystring.parse(allData);
  let name = convertedData.user;
  let place = convertedData.placeName;
  let rating = convertedData.rating;
  addData(name, place, rating, (err, res) => {
    console.log('my res ', res.rows);
    if (err) return serverError(err, response);
      response.writeHead(302, { 'Location': '/add-data' });
      response.end();
    });
  });
 };

 const publicHandler = (url, response) => {
   const filepath = path.join(__dirname, '..', url);
   readFile(filepath, (err, file) => {
     if (err) return serverError(err, response);
     const [, extension] = url.split('.');
     const extensionType = {
       html: 'text/html',
       css: 'text/css',
       js: 'application/javascript',
       ico: 'image/x-icon'
     };
     response.writeHead(200, { 'content-type': extensionType[extension] });
     response.end(file);
   });
 };

 const errorHandler = response => {
   response.writeHead(404, { 'content-type': 'text/html' });
   response.end('<h1>404 Page Requested Cannot be Found</h1>');
 };

module.exports = {
  homeHandler,
  getUsersHandler,
  createUserHandler,
  publicHandler,
  errorHandler,
  loginFormHandler,
  loginHandler,
  signUpHandler,
  addDataHandler,
  signUpFormHandler
};
