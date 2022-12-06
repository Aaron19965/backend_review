//index.js

import express from "express";
import { CouponController } from "../11-06-mvc-tight-coupling-with-product-coupon/mvc/controller/coupon.controller";
import { ProductController } from "./mvc/controllers/product.controller";

const app = express();

// 쿠폰 API
const couponController = new CouponController();
app.post("/coupon/buy", couponController.buyCoupon);

// 상품 API
const productController = new ProductController();
app.post("/product/buy", productController.buyProduct);
app.post("/product/refund", productController.refundProduct);

app.listen(3000);
