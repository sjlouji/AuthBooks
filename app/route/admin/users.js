const express = require('express');
const router = express.Router();
const UserController  = require('../../controller/admin/UserController')
const passport = require('passport')
const { insert, view, edit, remove } = require('../../middleware/permissions/UserConfigListPermission');


router.get('/list', passport.authenticate('jwt',{ session: false }), view, UserController.listallUsers)

module.exports = router;
