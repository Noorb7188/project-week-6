const {
  homeHandler,
  getUsersHandler,
  publicHandler,
  createUserHandler,
  errorHandler,
  loginHandler,
  signUpHandler,
  signUpFormHandler,
  addDataHandler,
  loginFormHandler
} = require('./handlers');

const router = (request, response) => {
  const { url, method } = request;
  if (url === '/') {
    homeHandler(response);
  } else if (url === '/places') {
    getUsersHandler(response);
  } else if (url === '/signupform') {
    signUpFormHandler(request, response);
  } else if (url === '/signup') {
    signUpHandler(request, response);
  } else if (url === '/login') {
    loginHandler(request, response);
  } else if (url === '/add-data') {
    addDataHandler(request, response);
  }else if (url === '/loginform') {
    loginFormHandler(request, response);
  } else if (url === '/add-place') {
    createUserHandler(request, response);
  } else if (url.includes('public')) {
    publicHandler(url, response);
  } else {
    errorHandler(response);
  }
};

module.exports = router;
