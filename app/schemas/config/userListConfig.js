var mongoose = require('mongoose');

var userListConfig = new mongoose.Schema({
    can_view: {
        type: Boolean,
        default: false
    },
    can_edit: {
        type: Boolean,
        default: false
    },
    can_delete: {
        type: Boolean,
        default: false
    },
    can_add: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
    }
},{timestamps: true})

module.exports = userListConfig;
