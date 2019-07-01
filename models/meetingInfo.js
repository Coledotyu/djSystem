const mongoose = require('mongoose');

const meetingInfoSchema = mongoose.Schema({
  meeting_theme: String,
  meeting_time: Date,
  meeting_address: String,
  meeting_moderator: String,
  meeting_attendee: String,
  meeting_absentee: String,
  meeting_content: String,
  meeting_photo_url: String,
});

module.exports = mongoose.model('meetingInfo', meetingInfoSchema);
