const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp', {
    // useNewUrlParser와 useUnifiedTopology 옵션을 제거
})
.then(() => {
    console.log("연결완료!!!!!!!!!!!!!!!!!");
})
.catch(err => {
    console.log("Error connecting to MongoDB");
    console.error(err);
})

const productSchema = new mongoose.Schema({
    name:{
        type: String, //더 많은 사항을 추가
        required: true, //예를 들면 name은 필수 사항이라던가
        maxlength: 20
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    onSale:{
        type: Boolean,
        default: false //따로 설정하지 않으면 false
        //default는 밑에 모델을 하나 만들때 따로 정보를 입력하지 않으면 자동으로 저장되는것.
    },
    categories: [String],
    qty: {
        online:{
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L'] //이것들 중에서만 선택 가능
    }
});

// productSchema.methods.greet = function () {
//     console.log("HELLO!!! HI!! HOWDy!!!")
//     console.log(`- from ${this.name}`) // ' != ` , this.name은 Bike Helmet
// }
// const p = new Product({name: 'bike bag', price: 10}) 새로운 상품 추가



const Product = mongoose.model('Product', productSchema);

const findProduct = async () => { //새 상품을 추가해주는 과정
    const foundProduct = await Product.findOne({ name: 'mountain Bike'});
    foundProduct.greet(); //해당되는 모델이 있어야 greet이 된다.
}

findProduct();

// const bike = new Product({name: 'mountain Bike', price: 28.50, categories: ['Cycling'], size: 'L' })
// bike.save() //저장
// .then(data => { //작동이 제대로 되었는지 확인
//     console.log("작동!!!")
//     console.log(data);
// })
// .catch(err => {
//     console.log("ERROR!!!")
//     console.log(err)
// })



// Product.findOneAndUpdate({name: 'Tire Pump'}, {price: -10.99}, {new: true} ) //"-" 옵션이 적용되었지만 잘 작동하는데 그 이유는 findOneAndUpdate의 기본값이 true이기 때문이다.
// .then(data => { //작동이 제대로 되었는지 확인
//     console.log("작동!!!")
//     console.log(data);
// })
// .catch(err => {
//     console.log("ERROR!!!")
//     console.log(err)
// })