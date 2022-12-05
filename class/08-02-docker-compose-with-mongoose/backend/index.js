// 설치한 express 사용하기
import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
// 환경변수 파일을 사용하기 위한 import
import "dotenv/config";
import mongoose from "mongoose";
import { Board } from "./model/board.model.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));

app.post("/tokens/phone", (req, res) => {
    //req.body 객체에 phone의 값을 phone이라는 변수에 담기
    const phone = req.body.phone;

    // 1. 휴대폰 자릿수 맞는지 확인
    const isVaild = checkValidationPhone(phone);

    // 만약 1번이 맞다면
    if (isVaild) {
        // 2. 핸드폰 토큰 6자리 만들기
        const myToken = getToken();

        // 3. 핸드폰에 토큰 전송하기
        sendTokenToSMS(phone, myToken);
        res.send("인증 완료");
    }
});

// email 전송 API
app.post("/users", (req, res) => {
    const { name, age, school, email } = req.body;

    // 1. 이메일 형식이 맞는지 확인 - 그 결과를 isValid 변수에 저장
    const isValid = checkValidationEmail(email);

    // 1번이 true라면,
    if (isValid) {
        // 2. 가입환영문구 만들기 실행 - 그 결과를 template에 저장
        const template = getWelcomeTemplate({ name, age, school, email });

        // 3. 이메일로 가입환영문구 보내주기
        sendWelcomeTemplateToEmail(email, template);
        res.send("가입완료");
    }
});

// express 공식문서 가져오기
// 게시물 목록 조회
app.get("/boards", async (req, res) => {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    // const result = [
    //     {
    //         number: 1,
    //         writer: "철수",
    //         title: "제목1",
    //         contents: "내용1",
    //     },
    //     {
    //         number: 2,
    //         writer: "영희",
    //         title: "제목2",
    //         contents: "내용2",
    //     },
    //     {
    //         number: 3,
    //         writer: "훈이",
    //         title: "제목3",
    //         contents: "내용3",
    //     },
    // ];
    const result = await Board.find();

    res.send(result); // 응답 보내기
});

// 게시물 등록하기
app.post("/boards", async (req, res) => {
    console.log(req.body); // 실제 데이터를 보기 위한 console

    // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
    const board = new Board({
        writer: req.body.writer,
        title: req.body.title,
        contents: req.body.contents,
    });
    await board.save();

    // 2. 저장 결과 응답주기
    res.send("게시물이 등록되었습니다.");
});

// 몽고DB 접속
mongoose.connect("mongodb://my-database:27017/my-docker");

// Backend API 서버 오픈
app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
}); // 3000번 포트에서 실행
