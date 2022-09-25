const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },  
    service_number: {
        type: String,
        required: true,
        unique: true, // 군번으로 로그인 시킬 거라서 unique 설정
    }, //군번
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }

})

module.exports = User = mongoose.model('user', UserSchema);