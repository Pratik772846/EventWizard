const express = require('express');
const router = express.Router();
const EventController = require('../controllers/events.js');

router.post('/create', EventController.createEvent);

router.delete('/:id', EventController.deleteEvent);
router.put('/:id', EventController.updateEvent);

module.exports = router;

