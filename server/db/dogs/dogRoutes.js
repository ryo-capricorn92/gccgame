/* global process */
var Dog = require('./dogModel');
var jwt = require('jwt-simple');
var secret = 'KeYbOaRdCaT';

module.exports = {
  newDog: function (req, res) {
    var dog = req.body.dog;
    var userId = jwt.decode(JSON.parse(req.headers['x-access-token']), secret).id;

    Dog.newDog(userId, dog)
      .then(function (newDog) {
        if (!newDog) {
          res.sendStatus(401, 'dog cannot be created');
        } else {
          res.json(newDog);
        }
      });
  },

  getDogsByUser: function (req, res) {
    var userId = req.body.user || jwt.decode(JSON.parse(req.headers['x-access-token']), secret).id;

    Dog.getAllDogsByOwner(userId)
      .then(function (dogs) {
        res.json({dogs: dogs});
      });
  },

  getAdultDogs: function (req, res) {
    var userId = jwt.decode(JSON.parse(req.headers['x-access-token']), secret).id;

    Dog.getAdults(userId)
      .then(function (dogs) {
        res.json({dogs: dogs});
      });
  },

  getPuppyDogs: function (req, res) {
    var userId = jwt.decode(JSON.parse(req.headers['x-access-token']), secret).id;

    Dog.getPuppies(userId)
      .then(function (dogs) {
        res.json({dogs: dogs});
      });
  },

  getAllBreedableDogs: function (req, res) {
    var userId = jwt.decode(JSON.parse(req.headers['x-access-token']), secret).id;

    Dog.getAllBreedableDogs(userId)
      .then(function (dogs) {
        res.json({dogs: dogs});
      });
  },

  getBreedableBitches: function (req, res) {
    var userId = jwt.decode(JSON.parse(req.headers['x-access-token']), secret).id;

    Dog.getBreedableBitchs(userId)
      .then(function (dogs) {
        res.json({dogs: dogs});
      });
  },

  getBreedableDogs: function (req, res) {
    var userId = jwt.decode(JSON.parse(req.headers['x-access-token']), secret).id;

    Dog.getBreedableDogs(userId)
      .then(function (dogs) {
        res.json({dogs: dogs});
      });
  }
}
