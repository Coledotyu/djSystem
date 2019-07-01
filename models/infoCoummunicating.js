const mongoose = require('mongoose');

const infoCommunicatingSchema = mongoose.Schema({
  post_theme: String,
  post_owner: String,
  published_time: Date,
  post_content_address: String,
  post_content_salary: String,
  post_content_duration: String,
  post_content_comms: String,
});

module.exports = mongoose.model('infoCommunicating', infoCommunicatingSchema);
