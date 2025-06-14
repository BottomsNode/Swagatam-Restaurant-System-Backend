import { AutoMap } from "@automapper/classes";
import { CategoryEntity } from "src/category/entities/category.entity";
import { OrderItemEntity } from "src/order-item/entities/order_item.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MenuItemEntity {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    name: string

    @AutoMap()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number

    @AutoMap()
    @Column({ default: 'empty' })
    description: string;

    @AutoMap()
    @ManyToOne(() => CategoryEntity, (category) => category.menuItems)
    category: CategoryEntity;

    @AutoMap()
    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.menuItem)
    orderItems: OrderItemEntity[];

    // @Column({ default: true })
    // isActive: boolean;

    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;

    // @DeleteDateColumn()
    // deletedAt: Date | null;
}