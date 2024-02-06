const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: {
        type : String, //실제암호X 해시암호 저장
        requried: [true, 'Password cannot be blank']
    },
    name: {
        type : String, 
        requried: [true, 'name cannot be blank']
    },
    motivated: {
        type : String, 
        requried: [true, 'motivated cannot be blank']
    }
})

module.exports = mongoose.model('User', userSchema);