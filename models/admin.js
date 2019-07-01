const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  account: String,
  password: String
});

module.exports = mongoose.model('Admin', adminSchema);
