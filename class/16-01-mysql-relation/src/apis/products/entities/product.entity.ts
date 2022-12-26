import { ProductTag } from './../../productTags/entities/productTag.entity';
import { ProductCategory } from "src/apis/productCategory/entities/productCategory.entity";
import { ProductSalesLocation } from "src/apis/productSalesLocation/entities/productSalesLocation.entity";
import { User } from "src/apis/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    isSoldout: boolean

    @JoinColumn()
    @OneToOne(() => ProductSalesLocation)
    productSalesLocation: ProductSalesLocation

    @ManyToOne(() => ProductCategory)
    productCategory: ProductCategory

    @ManyToOne(() => User)
    user: User

    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    productTags: ProductTag[]
}

