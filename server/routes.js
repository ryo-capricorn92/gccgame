var userRoutes = require('./db/users/userRoutes');
var dogRoutes = require('./db/dogs/dogRoutes');

module.exports = function (app, express) {
  app.post('/users/signup', userRoutes.signUp);
  app.post('/users/signin', userRoutes.signIn);
  app.post('/dogs/newDog', dogRoutes.newDog);
  app.get('/dogs', dogRoutes.getDogsByUser);
  app.get('/dogs/adults', dogRoutes.getAdultDogs);
  app.get('/dogs/puppies', dogRoutes.getPuppyDogs);
  app.get('/dogs/breedable', dogRoutes.getAllBreedableDogs);
  app.get('/dogs/breedable/bitches', dogRoutes.getBreedableBitchs);
  app.get('/dogs/breedable/dogs', dogRoutes.getBreedableDogs);
}
