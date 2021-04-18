var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: false,
    },
    isSuperAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isMember: {
        type: Boolean,
        required: true,
        default: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    password_reset_token: {
        type: String,
        required: false,
        default: ''
    },
    last_passport_reset_timestamp: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        required: false,
        default: ''
    },
    profile_img: {
        type: String,
        required: false,
        default: ' '
    },
},{timestamps: true})

module.exports = mongoose.model('User', userSchema);
