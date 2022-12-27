import { Repository } from 'typeorm';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ){}

    // 데이터를 하나하나 가져오는 로직
    async findOne({productId}){
        return await this.productRepository.findOne({where: {id: productId}})
    }

    // 데이터 목록을 조회하는 로직
    async findAll(){
        return this.productRepository.find()
    }

    async create({createProductInput}){
        try { 
            await this.productRepository.save({
            ...createProductInput, // 스프레드 연산자

            // 하나하나 직접 나열하는 방식
            // name: createProductInput.name,
            // description: createProductInput.description,
            // price: createProductInput.price
        })
        console.log('try 부분')
    } catch(error) {
        console.log(error)
        throw error
        }
    }

    async update({productId, updateProductInput}){
        const myProduct = await this.productRepository.findOne({where: {id: productId}})

        const newProduct = {
            ...myProduct,
            id: productId,
            ...updateProductInput
        }
        return this.productRepository.save(newProduct)
    }

    async checkSoldout({productId}){
        const product = await this.productRepository.findOne({where: {id: productId}})

        if(product.isSoldout) // isSoldout이 true라면(이미 판매되었다면)
            throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.')
    }

}

