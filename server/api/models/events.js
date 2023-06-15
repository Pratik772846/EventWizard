const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  budget: {
    type: Number,
  },
  guests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  description: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
    required: true
  },
  isAdmin: {
    type: Boolean,
  },
  adminId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
