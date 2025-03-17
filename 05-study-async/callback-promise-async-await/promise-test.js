const DB = [];

function saveDB(user) {
    // const oldDBSize = DB.length;
    const oldDBSize = DB.length + 1;    // 예외처리 테스트
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return new Promise((resolve, reject) => {   // 콜백 대신 Promise 객체 반환
        if(DB.length > oldDBSize) {
            resolve(user);  // 성공 시 유저 정보 반환
        }else {
            reject(new Error("Save DB ERROR!"));    // 1. 실패 시 에러 발생
        }
    });
}


function sendEmail(user) {
    console.log(`email to #${user.email}`);
    return new Promise((resolve) => {   // Promise 객체 반환, 실패 처리 없음
        resolve(user);
    });
}

function getResult(user) {
    return new Promise((resolve, reject) => {   // Promise 객체 반환
        resolve(`Success register ${user.name}`)        // 성공 시 성공 메시지와 유저명 반환
    });
}


function registerByPromise(user) {
    // 2. 비동기 호출이지만, 순서를 지켜서 실행
    const result = saveDB(user).then(sendEmail).then(getResult).catch(error => new Error(error));

    // 3. 아직 완료되지 않았으므로 지연(pending)상태
    console.log(result);
    return result;
}


// const myUser = { email: "purity@test.com", password: "1234" , name: "purity" };
// const result = registerByPromise(myUser);
// // 결괏값이 Promise이므로 then() 메서드 함수를 넣어서 결괏값을 볼 수 있음
// result.then(console.log);


// 동시에 여러 Promise 객체 호출
const myUser = { email: "purity2@test.com", password: "1234" , name: "purity2" };
allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);