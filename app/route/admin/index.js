const express = require('express');
const router = express();
const auth = require('./auth')
const blackList = require('./blackList')
const config = require('./config')
const users = require('./users')

router.use('/auth',auth)
router.use('/blacklist',blackList)
router.use('/config',config)
router.use('/users',users)

module.exports = router;