const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
    ref:'Event'
  },
  // invitationSent: {
  //   type: Boolean,
  //   default: false,
  // },
  // name :{
  //   type:String,
  //   required:true
  // },
  // venue :{
  //   type:String,
  //   required:true
  // },
  // date:{
  //   type:Date,
  //   required:true
  // }
});

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: { type: String, required: true },
  image: { type: String },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  contact_number: { type: String },
  refreshToken: { type: String },
  invitations: [{eventId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' },name:String,venue:String}]
  // invitations:[invitationSchema]
});

module.exports = mongoose.model('User', userSchema);
