const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Define routes
router.post('/register', authController.signup); // 'signup' instead of 'register'
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;  // Make sure the router is exported
