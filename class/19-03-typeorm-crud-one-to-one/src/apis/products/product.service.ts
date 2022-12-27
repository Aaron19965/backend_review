import { Repository } from 'typeorm';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSalesLocation } from '../productSalesLocation/entities/productSalesLocation.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductSalesLocation)
        private readonly productSalesLocationRepository: Repository<ProductSalesLocation>
    ){}

    // 데이터 목록을 조회하는 로직
    async findAll() {
        return await this.productRepository.find({
          relations: ['productSalesLocation'],
        });
      }  

    // 데이터를 하나하나 가져오는 로직
    async findOne({productId}){
        return await this.productRepository.findOne({
            where: {id: productId},
            relations: ['productSalesLocation']
        })
    }

    async create({createProductInput}){
        // 1. 상품만 등록하는 경우
        // const result = await this.productRepository.save({
        //   ...createProductInput,

      // 하나하나 직접 나열하기(비효율적, 원본이 바뀌게됨)
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
      // productSalesLocation: createProductInput.productSalesLocation
    // });
    // console.log(result);

        // 2. 상품과 상품거래위치를 같이 등록하는 경우
        const {productSalesLocation, ...product} = createProductInput

        const result = await this.productSalesLocationRepository.save({
            // 스프레드 연산자를 사용해서 저장
            // ...createProductInput.productSalesLocation
            ...productSalesLocation
        })

        const result2 = await this.productRepository.save({
            ...product,
            productSalesLocation: result // result 통째로 넣는 방법
        })

        return result2
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

