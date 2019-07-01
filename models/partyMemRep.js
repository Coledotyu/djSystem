const mongoose = require('mongoose');

const partyMemRepSchema = mongoose.Schema({
  name: String,
  age: Number,
  phone_number: String,
  address: String,
  party_branch: String,
  specialty: String,
  time: Date
});

module.exports = mongoose.model('partyMemRep', partyMemRepSchema);
