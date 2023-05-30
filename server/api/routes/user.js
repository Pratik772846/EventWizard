const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.js');

router.post('/signup',UserController.signup);
router.post('/login',UserController.login);
router.delete('/:userId',UserController.delete_account);

module.exports=router;