import { UpdateProductInput } from './dto/updateProduct.input';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateProductInput } from "./dto/createProduct.input";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";

@Resolver()
export class ProductResolver {
    constructor(
        private readonly productService: ProductService
    ){}

    // 데이터 한개를 가져오는 로직
    @Query(() => Product)
    async fetchProduct(
        @Args('productId') productId: string, //
    ){
        return await this.productService.findOne({productId})
    }

    // 데이터 목록을 조회하는 로직
    @Query(() => [Product])
    async fetchProducts(){
        return await this.productService.findAll()
    }

    @Mutation(() => Product)
    async createProduct(
        @Args('createProductInput') createProductInput: CreateProductInput
    ){
        return await this.productService.create({createProductInput})
    }

    @Mutation(() => Product)
    async updateProduct(
        @Args('productId') productId: string, //
        @Args('updateProductInput') updateProductInput: UpdateProductInput
    ){
        // 판매 완료가 되었는지 확인해보기
        await this.productService.checkSoldout({productId})

        // 수정하기
        return await this.productService.update({productId, updateProductInput})
    }
}

