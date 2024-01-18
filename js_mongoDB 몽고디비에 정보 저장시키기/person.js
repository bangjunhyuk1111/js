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


const personSchema = new mongoose.Schema({
    first: String,
    last: String
})



//가상 mongoose 
personSchema.virtual('fullName').get(function (){
    return `${this.first} ${this.last}`
})
//const tom = new Person({first: 'Tammy', last: 'Chow'})
//tom.fullName
//이런식으로 사용가능



//미들웨어로 정의하기
personSchema.pre('save', async function (){
    this.first = 'YO'
    this.last = 'MAMA'; // 이 방법으로 처음에 first와 last를 무엇으로 정의하던지 상관없이 이렇게 정의된다
    console.log("ABOUT TO SAVE!!!!")
})

personSchema.post('save', async function (){
    console.log("JUST SAVE!!!!")
})


const Person = mongoose.model('Person', personSchema); //데이터베이스 이름은 people

