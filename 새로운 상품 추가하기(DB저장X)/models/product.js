//모델 하나 작성
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true //무조건 필요한 정보라는 뜻.
    },
    price: {
        type: Number,
        require: true,
        min: 0 //최소값이 0 이라는 뜻.
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy'] //이 셋 중에 하나 골라 쓴다는 뜻.
    },
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product; //위 내용을 내보낸다는 뜻