const express = require('express');
const router = express.Router();
const InviteController = require('../controllers/invites.js');

router.post('/:eventId', InviteController.invites);
router.post('/accept', InviteController.acceptInvite);
router.post('/reject', InviteController.rejectInvite);
router.post('/acceptAll', InviteController.acceptAllInvites);
router.post('/rejectAll', InviteController.rejectAllInvites);

module.exports = router;


// invites, acceptInvite, rejectInvite, acceptAllInvites,rejectAllInvites