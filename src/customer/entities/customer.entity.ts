import { AutoMap } from "@automapper/classes";
import { OrderEntity } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CustomerEntity {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    name: string

    @AutoMap()
    @Column()
    phone: string

    @AutoMap()
    @Column()
    email: string

    @OneToMany(() => OrderEntity, (order) => order.customer)
    orders: OrderEntity[]

    // @Column({ default: true })
    // isActive: boolean;

    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;

    // @DeleteDateColumn()
    // deletedAt: Date | null;
}