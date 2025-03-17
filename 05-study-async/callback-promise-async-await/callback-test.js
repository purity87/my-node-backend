const DB = [];

// 회원 가입 API 함수
function register(user) {   // 1. callback이 3중으로 중첩된 함수
    return saveDB(user, function (user) {    // callback
        return sendEmail(user, function (user) {    // callback
            return getResult(user); // callback
        });
    });
}

// 2. DB에 저장 후 callback 실행
function saveDB(user, callback) {
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return callback(user);
}

// 3. email 발송 로그만 남기는 코드 실행 후 callback 실행
function sendEmail(user, callback) {
    console.log(`email to ${user.email}`);
    return callback(user);
}

// 4. 결과를 반환하는 함수
function getResult(user) {
    return `Success register ${user.name}`;
}

const result = register({ email: "purity@test.com", password: "1234", name: "purity" });
console.log(result);