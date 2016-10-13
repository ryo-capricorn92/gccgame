var userRoutes = require('./db/users/userRoutes');
var dogRoutes = require('./db/dogs/dogRoutes');

module.exports = function (app, express) {
  app.post('/users/signup', userRoutes.signUp);
  app.post('/users/signin', userRoutes.signIn);
  app.post('/dogs/newDog', dogRoutes.newDog);
}
