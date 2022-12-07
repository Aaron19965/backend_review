//index.js

import express from "express";
import { ProductController } from "./mvc/controller/product.controller.js";
import { CouponController } from "./mvc/controller/coupon.controller.js";
import { ProductService } from "./mvc/controller/services/product.service.js";
import { CashService } from "./mvc/controller/services/cash.service.js";

const app = express();

const productService = new ProductService();
const moneyService = new CashService();

// 상품 API
const productController = new ProductController(moneyService, productService);
app.post("/products/buy", productController.buyProduct);
app.post("/products/refund", productController.refundProduct);

// 쿠폰 API
const couponController = new CouponController(moneyService);
app.post("/coupons/buy", couponController.buyCoupon);

app.listen(3000);

