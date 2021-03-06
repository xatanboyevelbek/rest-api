const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            default: null
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('User', userModel);