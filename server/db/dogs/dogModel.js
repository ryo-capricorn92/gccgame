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
  return Dog.create(dog)
    .then(function (newDog) {
      return User.findOne({ where: { id: userId } })
        .then(function (user) {
          return user.addDog(newDog)
            .then(function (user) {
              return user.save()
                .then(function (user) {
                  newDog.OwnerId = user.id;
                  return newDog;
                })
            });
        });
    });
};


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

User.hasMany(Dog, { foreignKey: 'OwnerId' });

module.exports = Dog;
