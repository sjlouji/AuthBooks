var mongoose = require('mongoose');

var blackListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
    }
},{timestamps: true})

module.exports = mongoose.model('BlackList', blackListSchema);
