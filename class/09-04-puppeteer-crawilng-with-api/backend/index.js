// const express = require('express');
// const app = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// const express = require("express");
import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { Board } from "./models/board.model.js";
import { Stock } from "./models/stock.model.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

// get 방식 - 목록 조회
app.get("/boards", async function (req, res) {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    // const result = [
    //   { number: 1, name: "철수", title: "짱구친구", contents: "철수에영" },
    //   { number: 2, name: "짱구", title: "떡잎마을", contents: "방범대" },
    //   {
    //     number: 3,
    //     name: "코난",
    //     title: "방범대는",
    //     contents: "애기들이하는거지",
    //   },
    // ];

    // new가 없는 이유 : 찾아오기만 하면 되기때문에
    const result = await Board.find();

    // 2. DB에서 꺼내온 결과를 브라우저에 응답(response)주기
    res.send(result);
});

// post 방식 - 게시글 생성
app.post("/boards", async function (req, res) {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(req.body);

    // 2. 데이터를 등록하는 로직 -> DB에 접속해서 데이터 저장하기
    const board = new Board({
        writer: req.body.writer,
        title: req.body.title,
        contents: req.body.contents,
    });
    await board.save();

    // 3. DB에 저장이 잘 됐으면, 결과를 브라우저에 응답(response) 주기
    // 상태코드까지 같이 넘겨줌(.status)
    res.send("게시물 등록에 성공하였습니다.").status(200);
});

app.post("/tokens/phone", (req, res) => {
    // 1. 휴대폰 번호의 자릿수가 맞는지 확인하기
    // 브라우저에서 보내준 데이터 확인
    // const myphone = req.body.myphone;
    const { myphone } = req.body; // 위에꺼를 구조분해할당
    // 그 데이터 안에 있는 myphone을 사용하기
    const isValid = checkPhone(req.body.myphone);
    // false가 리턴되었다면 이 함수도 리턴해줘(종료해줘)
    if (isValid === false) return;

    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 헨드폰 번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);

    res.send("인증완료!").status(200);
});

app.post("/users", (req, res) => {
    // const name = req.body.name
    // const age = req.body.age
    // const school = req.body.school
    // const email = req.body.email
    //  위에 거를 한줄로 구조분해 할당!
    const { name, age, school, email } = req.body;

    // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
    const isValid = checkEmail(email);
    if (isValid === false) return;

    // 2. 가입환영 템플릿 만들기
    const mytemplate = getWelcomeTemplate({ name, age, school });

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(email, mytemplate);
    res.send("가입완료");
});

app.get("/stocks", async (req, res) => {
    const stocks = await Stock.find();
    res.send(stocks);
});

// 몽고DB 접속
mongoose.connect("mongodb://my-database:27017/my-docker");

// Backend API 서버 오픈
// listen : 24시간 내내 켜줘, 3000 : 서버, 다른 사람의 접속을 기다림.
app.listen(3000, () => {
    console.log("프로그램을 켜는데 성공했어요.");
});
