const { readFile } = require('fs');
const path = require('path');
const querystring = require('querystring');
const showData = require('./queries/showData.js');
const addData = require('./queries/addData.js');
const url = require('url');

const serverError = (err, response) => {
  response.writeHead(500, 'Content-Type:text/html');
  response.end('<h1>Sorry, there was a problem loading the homepage</h1>');
  console.log(err);
};

const homeHandler = response => {
  const filepath = path.join(__dirname, '..', 'public', 'index.html');
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  });
};

const getUsersHandler = response => {
showData((err, users) => {
  if (err) return console.log(err);
  let userData = JSON.stringify(users);
  console.log('my userData from showdata:', userData);
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(userData);
});
};
//create function isnt getting the url of the request :(
const createUserHandler = (request, response) => {
  console.log('my requset url:', request.url);
  console.log('parsed url', url.parse(request.url));
let allData = '';
request.on('data', chunkData => {
  console.log('chunkData is ', chunkData);
  allData+= chunkData;
});
request.on('end', () => {
  console.log('my all data', allData);
  const convertedData = querystring.parse(allData);
  console.log('my data from handler', convertedData);
  let name = convertedData.userName;
  let location = convertedData.placeName;
  let rating = convertedData.rating;
  addData(name, err => {
    if (err) {
      console.log('my error is ', err);
    } else {
      response.writeHead(302, {'Location': '/'});
      response.end()
    }
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

const errorHandler = (err, response) => {
  response.writeHead(404, { 'content-type': 'text/html' });
  response.end('<h1>404 Page Requested Cannot be Found</h1>');
};

module.exports = {
  homeHandler,
  getUsersHandler,
  createUserHandler,
  publicHandler,
  errorHandler
};
