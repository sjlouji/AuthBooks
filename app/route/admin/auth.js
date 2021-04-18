const express = require('express');
const router = express.Router();
const AuthController  = require('../../controller/admin/AuthController')
const passport = require('passport')


router.post('/login', AuthController.passportLogin);
router.post('/register', AuthController.passportRegister);
router.post('/reset', AuthController.passportForgotPassword);
router.put('/reset', AuthController.passportResetPassword);

module.exports = router;
