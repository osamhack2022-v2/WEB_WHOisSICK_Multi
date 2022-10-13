const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    servNum : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    cadre : {
        type: Boolean,
        required: true,
    },//간부인지
    _id : {
        type: Int32Array,
        required: true,
    }
});

module.exports = User = mongoose.model('user', UserSchema);