const { readFile } = require('fs');
const path = require('path');
const querystring = require('querystring');
const getData = require('./queries/getData.js');
const postData = require('./queries/postData.js');
//const users = require('./static');

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
getData((err, res) => {
  if (err) return console.log(err);
  let userData = JSON.stringify(res);
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(userData);
});
};

const createUserHandler = (request, response) => {
let allData = '';
request.on('data', chunkData => {
  allData+= chunkData;
});
request.on('end', () => {
  const convertedData = querystring.parse(allData);
  let name = convertedData.name;
  let location = convertedData.location;
  postData(name, location, err => {
    if (err) {
      console.log('my error is ', err);
    } else {
      response.writeHead(302, {'Location': '/'});
      response.end()
    }
  })
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
  errorHandler
};
