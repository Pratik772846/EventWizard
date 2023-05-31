const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.js');

router.post('/signup',UserController.signup);
router.post('/login',UserController.login);
router.delete('/:userId',UserController.delete_account);
router.put('/:userId',UserController.updateProfile);
router.get('/',UserController.allUsersProfile);
router.get('/:userId',UserController.getUserProfile);
module.exports=router;