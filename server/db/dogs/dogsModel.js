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
  attr: Sequelize.JSON,
  image: Sequelize.STRING,
  cooldown: Sequelize.DATE,
  companion: Sequelize.BOOLEAN
});

Dog.getAll = function (user) {
  return Dog.findAll({ where: {
    OwnerId: user.OwnerId
  }});
}

Dog.getAdults = function (user) {
  return Dog.findAll({
    where: {
      OwnerId: user.OwnerId,
      age: { gt: 23 }
    }
  });
}

Dog.getPuppies = function (user) {
  return Dog.findAll({
    where: {
      OwnerId: user.OwnerId,
      age: { lt: 24 }
    }
  });
}
