import { AutoMap } from "@automapper/classes";
import { OrderEntity } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum TableStatus {
    AVAILABLE = 'AVAILABLE',
    OCCUPIED = 'OCCUPIED',
}
@Entity()
export class TableEntity {

    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    tableNumber: number;

    @AutoMap()
    @Column({ type: 'enum', enum: TableStatus, default: TableStatus.AVAILABLE })
    status: TableStatus;

    @OneToMany(() => OrderEntity, (order) => order.table)
    orders: OrderEntity[];

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}