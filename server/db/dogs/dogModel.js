var Sequelize = require('sequelize');
var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'));
var db = require('../db');
var User = require('../users/userModel');

var Dog = db.define('dog', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
  gender: Sequelize.STRING,
  attr: Sequelize.JSON,
  image: Sequelize.STRING,
  cooldown: Sequelize.DATE,
  companion: Sequelize.BOOLEAN
});

Dog.newDog = function (userId, dog) {
  return Dog.findOrCreate({ defaults: dog })
    .then(function (dog) {
      return User.findById(userId)
        .then(function (user) {
          user.addDog(dog);
        })
    })
}


Dog.getAllDogsByOwner = function (userId, where) {
  return User.findById(userId)
    .then(function (user) {
      if (where) {
        return user.getDogs({ where: where });
      } else {
        return user.getDogs();
      }
    })
}

Dog.getAdults = function (userId) {
  return Dog.getAllDogsByOwner(userId, { age: { gt: 23 } });
}

Dog.getPuppies = function (userId) {
  return Dog.getAllDogsByOwner(userId, { age: { lt: 24 } });
}

Dog.getAllBreedableDogs = function (userId) {
  return Dog.getAllDogsByOwner(userId, { age: { gt: 23 }, cooldown: 0 });
}

Dog.getBreedableBitches = function (userId) {
  return Dog.getAllDogsByOwner(userId, { age: { gt: 23 }, cooldown: 0, gender: 'female' });
}

Dog.getBreedableDogs = function (userId) {
  return Dog.getAllDogsByOwner(userId, { age: { gt: 23 }, cooldown: 0, gender: 'male' });
}

module.exports = Dog;
