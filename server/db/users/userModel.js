var Sequelize = require('sequelize');
var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'));
var db = require('../db');
var Dog = require('../dogs/dogModel');

var User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  companion: Sequelize.STRING
});

User.hasMany(Dog, {as: 'Dogs', foreignKey: 'OwnerId'});

User.hook('beforeCreate', function (user) {
  return bcrypt.hashAsync(user.password, null, null)
    .then(function (hashPass) {
      user.password = hashPass;
    });
});

User.comparePassword = function (possPass, currPass) {
  return bcrypt.compareAsync(possPass, currPass);
};

User.signUp = function (username, password) {
  return User.findOne({ where: { username: username } })
    .then(function (user) {
      if (user) {
        return null;
      } else {
        return User.findOrCreate({
          where: { username: username },
          defaults: { password: password }
        })
          .spread(function (user, create) {
            return user;
          })
      }
    });
};

User.signIn = function (username, password) {
  return User.findOne({ where: { username: username } })
    .then(function (user) {
      if (!user) {
        return null;
      } else {
        return User.comparePassword(password, user.password)
        .then(function (match) {
          return match ? user : null;
        });
      }
    });
};

User.getAllDogsByOwner = function (userId, where) {
  return User.findById(userId)
    .then(function (user) {
      if (where) {
        return user.getDogs({ where: where });
      } else {
        return user.getDogs();
      }
    })
}

User.getOneDog = function (dogId, user) {
  // return User.
}

User.getCompanionDog = function (userId) {
  return User.findById(userId)
    .then(function (user) {
      return user.getDogs({ where: { companion: true } });
    })
}

module.exports = User;
