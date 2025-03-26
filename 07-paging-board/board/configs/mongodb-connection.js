const { MongoClient } = require('mongodb');
require('dotenv').config({ path: require("path").resolve(__dirname, "../../../.env") });

const url =  "mongodb+srv://"+process.env.MONGO_DB_USER+":"+process.env.MONGO_DB_PASSWORD+"@"+process.env.MONGO_DB_CLUSTER+"?retryWrites=true&w=majority&appName=Cluster0";

// 1. 몽고디비 연결 주소
const uri = process.env.MONGO_DB_URI+"board";

module.exports =  function (callback) { // 2. 몽고디비 커넥션 연결 함수 반환
    return MongoClient.connect(uri, callback);
}