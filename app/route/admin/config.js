const express = require('express');
const router = express.Router();
const userConfig  = require('../../controller/admin/UserConfigController');
const passport = require('passport');

router.post('/admin/default', passport.authenticate('jwt',{ session: false }), userConfig.addAdminConfig);
router.post('/superadmin/default', passport.authenticate('jwt',{ session: false }), userConfig.addSuperAdminConfig);
router.post('/update', passport.authenticate('jwt',{ session: false }), userConfig.updateUserConfig);

module.exports = router;
