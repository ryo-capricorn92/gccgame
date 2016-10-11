var userRoutes = require('./db/users/userRoutes');

module.exports = function (app, express) {
  app.post('/users/signup', userRoutes.signUp);
  app.post('/users/signin', userRoutes.signIn);
}
