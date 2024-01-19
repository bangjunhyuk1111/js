const mongoose = require('mongoose');

const Product = require('./models/product'); //파일을 분리해서 작성했던 모델을 불러옴.

mongoose.connect('mongodb://127.0.0.1:27017/farmStand', {
    // useNewUrlParser와 useUnifiedTopology 옵션을 제거
})
.then(() => {
    console.log("몽고 연결완료!!!!!!!!!!!!!!!!!");
})
.catch(err => {
    console.log("MONGO Error connecting to MongoDB");
    console.error(err);
})

//하나씩
const p = new Product({ 
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit'
})
p.save()
.then(p => {
    console.log(p)
})
.catch(e => {
    console.log(e)
})

//Product정보를 배열로 만들어서 insertMany를 사용해도 된다.
const seedProducts = [ //배열
    {
    name: 'Apple',
    price: 123,
    category: 'fruit'
    },
    {
    name: 'Banana',
    price: 456,
    category: 'fruit'
    }
    //등등등
]

Product.insertMany(seedProducts) //자동 save
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})