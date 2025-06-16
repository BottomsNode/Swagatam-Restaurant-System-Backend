import { AutoMap } from "@automapper/classes";
import { CustomerEntity } from "src/customer/entities/customer.entity";
import { OrderItemEntity } from "src/order-item/entities/order_item.entity";
import { StaffEntity } from "src/staff/entities/staff..entity";
import { TableEntity } from "src/table/entities/table.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum OrderStatus {
    PENDING = 'PENDING',
    IN_PROCESS = 'IN PROCESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}
@Entity()
export class OrderEntity {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @AutoMap()
    orderTime: Date

    @AutoMap()
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    totalAmount: number;

    @AutoMap()
    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;

    @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
    customer: CustomerEntity;

    @ManyToOne(() => TableEntity, (table) => table.orders)
    table: TableEntity;

    @ManyToOne(() => StaffEntity, (staff) => staff.orders)
    staff: StaffEntity;

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, { cascade: true })
    items: OrderItemEntity[];

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}