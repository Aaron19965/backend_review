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

    async delete({productId}){
        // 1. 실제 삭제
        // const result = await this.productRepository.delete({id: productId})

        // 2. soft delete(직접 구현) - isDeleted
        // await this.productRepository.update({id: productId}, {isDeleted: true})

        // 3. soft delete(직접 구현) - deletedAt
        // await this.productRepository.update({id: productId}, {deletedAt: new Date()})

        // 4. soft delete(TypeORM 제공) - softRemove
        // await this.productRepository.softRemove({id: productId}) // id로만 삭제 가능

        // 5. soft delete(TypeORM 제공) - softDelete
        const result = await this.productRepository.softDelete({id: productId})

        return result.affected ? true : false
    }

}

