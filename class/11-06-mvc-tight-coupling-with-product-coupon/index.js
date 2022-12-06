//index.js

import express from "express";
import { ProductController } from "./mvc/controllers/product.controller";

const app = express();

// 상품 API
const productController = new ProductController();
app.post("/product/buy", productController.buyProduct);
app.post("/product/refund", productController.refundProduct);

app.listen(3000);

