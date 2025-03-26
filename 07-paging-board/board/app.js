// controller 역할

const express = require('express')
const handlebars = require('express-handlebars')

const app = express()

// req.body와 POST 요청을 해석하기 위한 설정
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const postService = require('./services/post-service')  // 서비스 파일 로드


// 1. 몽고디비 연결 함수
const mongodbConnection = require("./configs/mongodb-connection");
const {MongoClient} = require("mongodb");

// app.engine("handlebars", handlebars.engine())   // 1. 템플릿 엔진으로 핸들바 등록
app.engine("handlebars",
    handlebars.create({ // 1. 핸들바 생성 및 엔진 반환
        helpers: require("./configs/handlebars-helper"),
    }).engine
)
app.set("view engine", "handlebars")    // 2, 웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views")  // 3. 뷰 디렉토리를 views로 설정

// 4. 라우터 설정
app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // 현재 페이지 데이터
    const search = req.query.search || "";  // rjatordj epdlxj
    try {
        // postService.list에서 글 목록과 페이지네이터를 가져옴
        const [posts, paginator] = await postService.list(collection, page, search);

        // list 페이지 렌더링
        res.render("home", { title: "테스트 게시판📝", search, paginator, posts });
    }catch(err) {
        console.error(err);
        res.render("home", { title: "테스트 게시판📝" });
        // 에러가 나는 경우 빈값으로 렌더링
    }


});

// 쓰기 페이지 이동
app.get("/write", (req, res) => {
    res.render("write", { title: "테스트 게시판📝"})
});
// 글쓰기
app.post("/write", async (req, res) => {
    const post = req.body;
    // 글쓰기 후 결과 반환
    const result = await postService.writePost(collection, post);
    // 생성된 도큐먼트의 _id를 사용해 상세페이지로 이동
    res.redirect(`/detail/${result.insertedId}`);
});

// 상세
app.get("/detail", (req, res) => {
    res.render("detail", { title: "테스트 게시판📝", comment: "댓글내용"})
});


let collection;
app.listen(3000, async () => {
    console.log("Server started");
    // 2. mongodbConnection()의 결과는 mongoClient
    const mongoClient = await mongodbConnection();
    // 3. mongoClient.db()로 디비 선택 collection()으로 컬렉션 선택 후 collection에 할당
    collection = mongoClient.db().collection("post")
    console.log("MongoDB connected")
});