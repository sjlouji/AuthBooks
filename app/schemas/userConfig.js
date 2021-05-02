var mongoose = require('mongoose');
const blackListConfig = require('./config/blackListConfig');
const userConfig = require('./config/userConfig');
const userListConfig = require('./config/userListConfig');

var userConfigSchema = new mongoose.Schema({
    blackList: blackListConfig,
    userConfig: userConfig,
    userListConfig: userListConfig,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
    }
},{timestamps: true})

module.exports = mongoose.model('UserConfig', userConfigSchema);
