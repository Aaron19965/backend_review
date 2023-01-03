import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory])],
    providers: [
        ProductCategoryResolver, //
        ProductCategoryService
    ]
})
export class ProductCategoryModule {}

