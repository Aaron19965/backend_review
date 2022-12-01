// 설치한 express 사용하기
import express from "express";

const app = express();

// express 공식문서 가져오기
app.get("/", (req, res) => {
    res.send("Hello World"); // 응답 보내기
});

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
}); // 3000번 포트에서 실행
