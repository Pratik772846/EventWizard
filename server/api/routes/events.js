const express = require('express');
const router = express.Router();
const EventController = require('../controllers/events.js');
const checkAuth = require("../middleware/check-auth");

router.post('/create',checkAuth, EventController.createEvent);
router.get('/:id',checkAuth, EventController.getEvent);
router.delete('/:id', checkAuth,EventController.deleteEvent);
router.put('/:id',checkAuth, EventController.updateEvent);
router.get('/',checkAuth, EventController.getAllEvents);
router.get('/admin/:id',checkAuth, EventController.getAdminInfo);
router.get('/guests/:id',checkAuth, EventController.getGuests);
router.post('/',checkAuth,EventController.getYourEvents);

module.exports = router;

