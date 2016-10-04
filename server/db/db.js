var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
  visits: Number,
  link: String,
  title: String,
  code: String,
  base_url: String,
  url: String
});

module.exports = mongoose.model('Link', LinkSchema);
