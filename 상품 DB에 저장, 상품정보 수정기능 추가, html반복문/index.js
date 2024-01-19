const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override') //설치한 패키지를 불러옴

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
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy', 'fungi'] //수정할때 selected부분 코드 간단하게 하기위한 배열을 추가, 그리고 새로운 카테고리를 추가할때도 편하다

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
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => { //상품을 추가했을때 결과
    const newProduct = new Product(req.body)
    await newProduct.save(); //실제 상품을 DB에 저장
    //http://localhost:3000/products/new 에서 추가 가능
    res.redirect(`/products/${newProduct._id}`) //생성된 상품정보를 페이지에 띄움
    //새로고침 했을때 상품이 계속 생성되는걸 방지 redirect
})

app.get('/products/:id', async (req, res) => { // get 뒤에 오는부분은 링크주소
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log(product); //콘솔창에
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => { //상품정보 수정
    const { id } = req.params;
    const product = await Product.findById(id) //id를 가져온다는 느낌?
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => { //수정한 정보를 저장했을때
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!!!")
})