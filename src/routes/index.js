const express = require('express'),
    router = express.Router(),
    registerController = require('../controllers/register.controller'),
    loginController = require('../controllers/login.controller'),
    forgotController = require('../controllers/forgotPassword.controller'),
    resetController = require('../controllers/resetPassword.controller');

/* Register Controller */
router.get('/register', registerController.index)
router.post('/register', registerController.register)

/* Login Controller */
router.get('/login', loginController.index)
router.post('/login', loginController.login)

/* Forgot-Password Controller */
router.get('/forgot-password', forgotController.index)
router.post('/forgot-password', forgotController.sendLink)

/* Reset-Password Controller */
router.get('/reset-password', resetController.index)
router.post('/reset-password', resetController.resetPassword)

module.exports = router