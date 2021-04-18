const express = require('express');
const router = express.Router();
const blackList  = require('../../controller/admin/BlackListController');
const passport = require('passport');

router.post('/insert', passport.authenticate('jwt',{ session: false }), blackList.blackListName);
router.get('/', passport.authenticate('jwt',{ session: false }), blackList.listNames);
router.put('/update', passport.authenticate('jwt',{ session: false }), blackList.updateNames);
router.delete('/delete', passport.authenticate('jwt',{ session: false }), blackList.deleteName);

module.exports = router;
