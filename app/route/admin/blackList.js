const express = require('express');
const router = express.Router();
const blackList  = require('../../controller/admin/BlackListController');
const passport = require('passport');
const { insert, view, edit, remove } = require('../../middleware/permissions/BlackListPermission');

router.post('/insert', passport.authenticate('jwt',{ session: false }), insert ,blackList.blackListName);
router.get('/', passport.authenticate('jwt',{ session: false }), view, blackList.listNames);
router.put('/update', passport.authenticate('jwt',{ session: false }), edit, blackList.updateNames);
router.delete('/delete', passport.authenticate('jwt',{ session: false }), remove, blackList.deleteName);

module.exports = router;
