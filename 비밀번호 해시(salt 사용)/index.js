const bcrypt = require('bcrypt');

// const hashPassword = async (pw) => { //솔트를 이용해 암호 해시
//     const salt = await bcrypt.genSalt(12); //해시 하는데 걸리는 시간??
//     const hash = await bcrypt.hash(pw, salt); //암호를 해시
//     console.log(salt); //솔트 생성 확인
//     console.log(hash);
// }

const hashPassword = async (pw) => { //솔트를 이용해 암호 해시
    const hash = await bcrypt.hash(pw, 12); //암호를 해시
    console.log(hash);
} //솔트를 따로 생성하지 않고 한번에 해결하는 방법

const login = async(pw, hashedPw) => { //데이터에 저장된 해시값과 비교
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("로그인 성공!!!")
    } else {
        console.log("로그인 실패!!!")
    }
}

//hashPassword('monkey'); //해시,솔트 생성 확인 

login('monkey', '$2b$12$7FliTcTp0JeZzLzeoNsD4unIUOjfUQONDcC3zwepOw/lPqFQvFbg.')
// 로그인 성공여부 확인