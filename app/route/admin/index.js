const express = require('express');
const router = express();
const auth = require('./auth')
const blackList = require('./blackList')

router.use('/auth',auth)
router.use('/blacklist',blackList)

module.exports = router;