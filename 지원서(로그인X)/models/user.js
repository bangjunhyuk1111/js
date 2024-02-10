const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { //이름
        type: String,
        required: [true, 'Username cannot be blank']
    },
    stunumber: { //학번
        type : String, 
        requried: [true, 'Password cannot be blank']
    },
    phonenumber: { //전화번호
        type : String, 
        requried: [true, 'name cannot be blank']
    },
    motivated: { //지원동기
        type : String, 
        requried: [true, 'motivated cannot be blank']
    }
})

module.exports = mongoose.model('User', userSchema);

//학번, 이름, 전화번호, 간단한 소개(지원동기)