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
      })
  }
}
