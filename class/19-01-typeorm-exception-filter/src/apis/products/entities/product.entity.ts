import { Int } from '@nestjs/graphql';
import { ProductTag } from '../../productTags/entities/productTag.entity';
import { ProductCategory } from "src/apis/productCategory/entities/productCategory.entity";
import { ProductSalesLocation } from "src/apis/productSalesLocation/entities/productSalesLocation.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product{
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string

    @Column()
    @Field(() => String)
    name: string

    @Column()
    @Field(() => String)
    description: string

    @Column()
    @Field(() => Int)
    price: number

    @Column({default: false})
    @Field(() => Boolean)
    isSoldout: boolean

    @JoinColumn()
    @OneToOne(() => ProductSalesLocation)
    @Field(() => ProductSalesLocation)
    productSalesLocation: ProductSalesLocation

    @ManyToOne(() => ProductCategory)
    @Field(() => ProductCategory)
    productCategory: ProductCategory

    @ManyToOne(() => User)
    @Field(() => User)
    user: User

    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    @Field(() => [ProductTag])
    productTags: ProductTag[]
}

