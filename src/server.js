const http = require('http');
const router = require('./router.js');

const server = http.createServer(router);
const port = process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`Server is working at port : ${port}`);
});
