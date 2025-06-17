import { AutoMap } from "@automapper/classes";
import { OrderEntity } from "../../../modules/order/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ROLES {
    WAITER = 'WAITER',
    CHEF = 'CHEF',
    MANAGER = 'MANAGER',
    CASHIER = 'CASHIER',
    CLEANER = 'CLEANER',
    ADMIN = 'ADMIN',
    SUPPORT = 'SUPPORT',
}

@Entity()
export class StaffEntity {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column({ type: 'enum', enum: ROLES, default: ROLES.WAITER })
    role: ROLES;

    @AutoMap()
    @Column({ unique: true })
    email: string;

    @OneToMany(() => OrderEntity, (order) => order.staff)
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