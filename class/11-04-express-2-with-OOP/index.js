import express from "express";
import { CashService } from "./cash";
import { ProductService } from "./product";

const app = express();

// 상품 구매하기
app.post("/product/buy", function (req, res) {
    // 1. 가진 돈을 검증하는 코드 (대략 10줄 => 2줄)
    const moneyService = new CashService();
    const hasMoney = CashService.checkValue(); // true or false

    // 2. 판매여부 검증하는 코드 (대략 10줄 => 2줄)
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout(); // true or false

    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) res.send("상품을 구매합니다.");
});

// 상품 환불하기
app.post("/product/refund", function (req, res) {
    // 1. 판매 여부 검증하는 코드 (대략 10줄 => 2줄)
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout(); // true or false

    // 2. 상품 환불하는 코드
    if (isSoldout) res.send("상품을 환불합니다.");
});

app.listen(3000);
