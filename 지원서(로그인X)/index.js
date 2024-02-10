const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/registerDemo', {
  
})
.then(() => {
    console.log("몽고BD연결성공");
})
.catch(err => {
    console.log("몽고DB연결실패");
    console.error(err);
})

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true}));

app.get('/', async (req, res) => {
    res.send('감사합니다!!!')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, stunumber, phonenumber, motivated } = req.body;
    const user = new User({ //회원가입에 입력한 정보를DB에 저장
        username,
        stunumber,
        phonenumber,
        motivated
    })
    await user.save();
    res.redirect('/')
})

app.listen(3000, () => { //nodemon(서버 열기)
    console.log("서버 접속 완료!!!")
})