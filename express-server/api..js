const express = require("express");
const app = express();
let posts = [];

// req.body를 사용하려면 json 미들웨어를 사용해야한다.
// 사용하지 않으면 undefined로 나옴.
app.use(express.json());

// post요청이 application/x-www-form-urlencoded 인 경우 파싱을 위해 사용.
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json(posts);
});

app.post("/posts", (req, res) => {
    console.log(typeof req.body);
    const { title, name, text } = req.body;
    posts.push({ id: posts.length + 1, title, name, text, createdDt: Date(),  updatedDt:"" });
    res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    const filteredPosts = posts.filter((post) => post.id !== +id);
    const isLengthChanged = posts.length !== filteredPosts.length;
    posts = filteredPosts;
    if (isLengthChanged) {
        res.json("OK");
        return;
    }
    res.json("NOT CHANGED");
});

// UPDATE
app.post("/udt-posts/:id", (req,res) => {
    console.log(req.body);
    console.log( req.params);
    const id = req.params.id;

    const selectedPost = posts.find(post => post.id == +id);
    console.log(selectedPost);
    console.log(selectedPost.toString());

    // 삭제
    posts = posts.filter((post) => post.id !== +id);    //  글 삭제 로직

    const { title, name, text } = req.body;
    // 8. 게시글 리스트에 새로운 게시글 정보  추가
    // TODO 추가할 때 비어있는 키 값은 기존 정보 데이터로 저장하는 로직 추가하면 좋을 듯!
    posts.push({ id: id, title, name, text , createdDt: selectedPost.createdDt, updatedDt: Date()});
    res.json({ title, name, text});
});

app.listen(3000, () => {
    console.log("welcome board START!");
});
