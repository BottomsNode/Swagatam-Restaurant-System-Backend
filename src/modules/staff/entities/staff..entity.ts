import { AutoMap } from "@automapper/classes";
import { OrderEntity } from "../../../modules/order/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { STAFF_ROLES } from "@/modules/auth/dto/all.roles.dto";

@Entity()
export class StaffEntity {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column({ type: 'enum', enum: STAFF_ROLES, default: STAFF_ROLES.WAITER })
    role: STAFF_ROLES;

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

export { STAFF_ROLES };
