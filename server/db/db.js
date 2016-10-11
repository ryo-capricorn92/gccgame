/* global process */
var Sequelize = require('sequelize');
var settings = require('./settings');

var url = process.env.DATABASE_URL || settings.DBURL;

var options = process.env.DATABSE_URL ? {
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true
    }
  }
} : {
  logging: false
};

var db = new Sequelize(url, options);

module.exports = db;
