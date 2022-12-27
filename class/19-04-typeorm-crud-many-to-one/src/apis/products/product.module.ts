import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductSalesLocation } from "../productSalesLocation/entities/productSalesLocation.entity";
import { Product } from "./entities/product.entity";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductSalesLocation])],
    providers: [
        ProductResolver, //
        ProductService
    ]
})
export class ProductModule {}

