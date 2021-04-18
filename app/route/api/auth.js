const express = require('express');
const router = express.Router();
const passportAuth  = require('../../controller/api/auth')
const passport = require('passport')

router.post('/login', passportAuth.passportLogin);

module.exports = router;
