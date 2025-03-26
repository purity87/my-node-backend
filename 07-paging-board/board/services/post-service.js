// 글쓰기
async function writePost(collection, post) {    // 글쓰기 함수
    // 생성일시와 조회수를 넣어줍니다.
    post.hits = 0;
    post.createdDt = new Date().toISOString();
    return await collection.insertOne(post);
}

// 페이지네이터를 가져옴
const paginator = require("../utils/paginator");

// 글 목록을 가져옴
async function list(collection, page, search) {    // 글쓰기 함수
    const perPage = 10;
    // title이 search와 부분일치하는지 확인
    const query = { title: new RegExp(search, 'i') };
    // limit는 10개만 가져온다는 의미, skip은 설정된 개수만큼 건너뛴다(skip).
    // 생성일 역순으로 정렬
    const cursor = collection.find(query, {limit: perPage, skip: (page - 1 ) * perPage}).sort({
        createdAt: -1
    });

    // 검색어에 걸리는 게시물의 총합
    const totalCount = await collection.count(query);

    // cursor로 받아온 데이터를 리스트 형태로 변환
    const posts = await cursor.toArray();

    // paginator 생성
    const paginatorObj = paginator({ totalCount, page, perPage: perPage});
console.log('posts > ', posts)
    return [ posts, paginatorObj ];

}

module.exports = {  // require()로 파일을 import 시 외부로 노출하는 객체
    writePost,
    list,
}