const Event = require('../models/events.js');
const mongoose = require('mongoose');
const User = require('../models/user.js');


const invites = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;
    
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
    
        // Find the user to invite
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Add the event ID to the user's invitations array
        await User.findByIdAndUpdate(userId, { $addToSet: { invitations: event._id } });
    
        res.json({ message: 'Invitation sent successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const acceptInvite = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user exists in the guests array
    if (!event.guests.includes(userId)) {
      event.guests.push(userId);
      await event.save();

      // Remove the event ID from the invitations array of the user
      const user = await User.findById(userId);
      if (user) {
        user.invitations = user.invitations.filter(invitationId => invitationId.toString() !== eventId.toString());
        await user.save();
      }
    }

    res.json({ message: 'Invitation accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 

const rejectInvite = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the event ID from the invitations array
    user.invitations = user.invitations.filter(invitationId => invitationId.toString() !== eventId.toString());
    await user.save();

    res.json({ message: 'Event rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const acceptAllInvites = async (req, res) => {
    try {
        const { userId } = req.body;
    
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Find all events where the user has invitations
        const events = await Event.find({ _id: { $in: user.invitations } });
    
        // Accept invitations for each event
        events.forEach(async (event) => {
          // Check if the user exists in the guests array
          if (!event.guests.includes(userId)) {
            event.guests.push(userId);
            await event.save();
          }
        });
    
        // Clear all invitations for the user
        user.invitations = [];
        await user.save();
    
        res.json({ message: 'All invitations accepted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const rejectAllInvites = async (req, res) => {
    try {
        const { userId } = req.body;
    
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Clear all invitations for the user
        user.invitations = [];
        await user.save();
    
        res.json({ message: 'All invitations rejected successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}


module.exports = {invites, acceptInvite, rejectInvite, acceptAllInvites,rejectAllInvites};