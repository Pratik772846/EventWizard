const Event = require('../models/events.js');
const mongoose = require('mongoose');

const createEvent = async (req, res) => {
  try {
    const { name, venue, date, budget, guests, description, isPrivate, isAdmin, adminEmail } = req.body;

    const existingEvent = await Event.findOne({ date, venue });

    if (existingEvent) {
      return res.status(400).json({ error: 'An event already exists on the same date and venue' });
    }

    const event = new Event({
      name,
      venue,
      date,
      budget,
      guests,
      description,
      isPrivate,
      isAdmin,
      adminEmail
    });

    const newEvent = await event.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;


    const deletedEvent = await Event.findByIdAndRemove(eventId);

    if (deletedEvent) {
      res.json(deletedEvent);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const { name, venue, date, budget, guests, description, isPrivate, isAdmin, adminEmail } = req.body;

    const parsedDate = new Date(date);

    const existingEventCount = await Event.countDocuments({
    
      date: parsedDate,
      venue
    });

    if (existingEventCount > 0) {
      return res.status(400).json({ error: 'An event already exists on the same date and venue' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        $set: {
          name,
          venue,
          date,
          budget,
          guests,
          description,
          isPrivate,
          isAdmin,
          adminEmail
        }
      },
      { new: true }
    );

    if (updatedEvent) {
      res.json(updatedEvent);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

const getEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get event' });
  }
}

module.exports = { createEvent, deleteEvent, updateEvent, getEvent};
