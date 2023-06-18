const Event = require('../models/events.js');
const mongoose = require('mongoose');
const User = require('../models/user.js');

const createEvent = async (req, res) => {
  try {
    const { name, venue, date, budget, guests, description, isPrivate, isAdmin, adminId } = req.body;

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
      adminId
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

// Any user can get only all public events . He cannot get any private events here.
const getAllEvents = async (req, res) => {
  Event.find({isPrivate:false})
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
}

// controlleres to get all events in which you are admin
const getYourEvents = async(req,res) => {
  // console.log(req?.userData?.userId);
  // console.log(req.body);
  const {id} = req.body;
  // const id =req?.userData?.userId;
  console.log(id);
  try{
    const events = await Event.find({adminId:id});
    res.status(200).json({events : events});
  }
  catch(err){
    console.error(err);
  }
}

// admin info of a particular event
const getAdminInfo = async (req,res)=>{
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const adminEmail = event.adminEmail;

    if (!adminEmail) {
      return res.status(404).json({ error: 'Admin email not available' });
    }

    const admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// GET request to retrieve information of all guests of a particular event
const getGuests = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId).populate('guests').exec();

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const guests = event.guests;
    return res.json({ guests });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
}

// to get information of all events of a particular user



module.exports = { createEvent, deleteEvent, updateEvent, getEvent, getAllEvents, getAdminInfo, getGuests, getYourEvents};


