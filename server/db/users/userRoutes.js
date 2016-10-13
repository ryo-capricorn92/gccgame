/* global process */
var User = require('./userModel');
var jwt = require('jwt-simple');
var secret = process.env.AUTH_SECRET || 'KeYbOaRdCaT';

module.exports = {
  signUp: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.signUp(username, password)
      .then(function (newUser) {
        if (!newUser) {
          res.sendStatus(401, 'user cannot be created');
        } else {
          var token = jwt.encode(newUser, secret);
          res.json({ token: token, user: newUser });
        }
      });
  },

  signIn: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.signIn(username, password)
      .then(function (user) {
        if (!user) {
          res.sendStatus(401, 'authentication failure - try another username or password');
        } else {
          var token = jwt.encode(user, secret);
          res.json({ token: token, user: user });
        }
      });
  },

  userCompanion:  function (req, res) {
    var userId = jwt.decode(JSON.parse(req.headers['x-access-token']), secret).id;
    User.getCompanionDog(userId)
      .then(function (companion) {
        res.json(companion);
      })
  },

  otherCompanion:  function (req, res) {
    var userId = req.body.id;
    User.getCompanionDog(userId)
      .then(function (companion) {
        res.json(companion);
      });
  }
}
