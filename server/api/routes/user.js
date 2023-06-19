const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.js');
const checkAuth = require("../middleware/check-auth");
const LogoutController = require("../controllers/logoutcontroller");

router.post('/signup',UserController.signup);
router.post('/login',UserController.login);
router.delete('/:userId',checkAuth,UserController.delete_account);
router.put('/:userId',checkAuth,UserController.updateProfile);
router.get('/',checkAuth,UserController.allUsersProfile);
router.get('/:userId',checkAuth,UserController.getUserProfile);
router.get('/logout',checkAuth,LogoutController.handleLogout);

module.exports=router;