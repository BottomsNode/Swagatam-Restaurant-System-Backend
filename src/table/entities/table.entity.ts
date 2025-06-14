import { AutoMap } from "@automapper/classes";
import { OrderEntity } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TableEntity {

    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    tableNumber: number;

    @AutoMap()
    @Column({ default: 'AVAILABLE' })
    status: string;

    @OneToMany(() => OrderEntity, (order) => order.table)
    orders: OrderEntity[];

    // @Column({ default: true })
    // isActive: boolean;

    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;

    // @DeleteDateColumn()
    // deletedAt: Date | null;
}