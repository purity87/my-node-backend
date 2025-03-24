var mongoose = require('mongoose');

// 몽구스로 스키마 만들기
var Schema = mongoose.Schema;

const personSchema = new Schema({   // 1. 스키마 객체 생성
    name: String,
    age: Number,
    email: { type: String, required: true },
});

module.exports = mongoose.model('Person', personSchema);    // 2. 모델 객체 생성
