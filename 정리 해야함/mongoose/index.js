const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/movieApp', {
    // useNewUrlParser와 useUnifiedTopology 옵션을 제거
})
.then(() => {
    console.log("연결완료!!!!!!!!!!!!!!!!!");
})
.catch(err => {
    console.log("Error connecting to MongoDB");
    console.error(err);
})

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema);

const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'}) //하나씩 삽입

//Movie.insertMany([ //대량 삽입
 //   { title: "Amelie1", year: 20010, score: 8.3, rating: "R1" },
 //   { title: "Amelie2", year: 20012, score: 8.32, rating: "R2" },
 //   { title: "Amelie3", year: 20013, score: 8.31, rating: "R3" },
  //  { title: "Amelie4", year: 20014, score: 8.30, rating: "R4" }
//])
//.then(data => {
//    console.log("작동!!!")
  //  console.log(data);
//})