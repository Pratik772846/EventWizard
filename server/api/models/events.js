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
    required: true
  },
  expenses: [
    {
      amount: {
        type: Number,
        
      },
      type: {
        type: String,
      }
    }
  ],
  guests: [
    {userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    },
    name:String,
    image:String}],
  description: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
    required: true
  },
  adminId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  invitationSent: [{
    id:mongoose.Schema.Types.ObjectId,
    name:String,
    email :String,
    image: String
  }]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
