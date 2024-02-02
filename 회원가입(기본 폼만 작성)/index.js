const express = require('express');
const app = express();
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/secret', (req, res) => {
    res.send("THIS IS SECRET!!! TOU CANNOT SEE ME!!!")
})

app.listen(3000, () => { //nodemon(서버 열기)
    console.log("서버 접속 완료!!!")
})

