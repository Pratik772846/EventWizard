const express = require('express');
const router = express.Router();
const EventController = require('../controllers/events.js');

router.post('/create', EventController.createEvent);
router.get('/:id', EventController.getEvent);
router.delete('/:id', EventController.deleteEvent);
router.put('/:id', EventController.updateEvent);
router.get('/', EventController.getAllEvents);
router.get('/admin/:id', EventController.getAdminInfo);
router.get('/guests/:id', EventController.getGuests);

module.exports = router;

