const mongoose = require('mongoose');

const partyMemInfoSchema = mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  party_time: Date,
  phone_number: String,
  address: String,
  party_branch: String,
  specialty: String,
  honor: String
});

module.exports = mongoose.model('partyMemInfo', partyMemInfoSchema);
