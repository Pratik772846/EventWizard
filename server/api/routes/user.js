const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.js');
const checkAuth = require("../middleware/check-auth");
const RefreshController = require("../controllers/refreshtokencontroller");
const LogoutController = require("../controllers/logoutcontroller");

router.post('/signup',UserController.signup);
router.post('/login',UserController.login);
router.delete('/:userId',UserController.delete_account);
router.put('/:userId',UserController.updateProfile);
router.get('/',UserController.allUsersProfile);
router.get('/:userId',UserController.getUserProfile);
router.get('/refresh',RefreshController.handleRefreshToken);
router.get('/logout',LogoutController.handleLogout);

module.exports=router;