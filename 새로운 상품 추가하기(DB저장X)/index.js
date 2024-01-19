const express = require('express');
const app = express();
const path = require('path');
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

// views 디렉토리가 유의미해지는 과정.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))// Express가 미들웨어를 사용하도록 명령

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    //console.log(products) //사이트에 접속했을때 콘솔창에 상품들이 뜸.
    res.render('products/index' , {products} )
    // 'products/index'는 일반적으로 'views' 디렉토리 내에서 'products' 폴더 안에 있는 'index' 파일을 나타냅니다. 
    // Express는 이러한 뷰 파일을 템플릿 엔진을 사용하여 동적으로 HTML로 렌더링한 후 클라이언트에게 응답으로 전송
    // {products} 해줌으로 서버에서 클라이언트로 HTML을 제공
})
//http://localhost:3000/dog
//제대로 실행되는지 확인.

app.get('/products/new', (req, res) => { //새로운 상품을 추가
    res.render('products/new')
})

app.post('/products', (req, res) => { //상품을 추가했을때 결과
    console.log(req.body) 
    res.send('making your product!!! 상품을 만들었습니다!!!')
    //http://localhost:3000/products/new 에서 추가 가능
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log(product); //콘솔창에
    res.render('products/show', { product })
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!!!")
})