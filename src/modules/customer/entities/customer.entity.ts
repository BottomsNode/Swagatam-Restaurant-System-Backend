import { AutoMap } from '@automapper/classes';
import { OrderEntity } from '../../../modules/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { USER_ROLES } from '@/modules/auth/dto/all.roles.dto';

@Entity()
export class CustomerEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  phone: string;

  @AutoMap()
  @Column({ unique: true })
  email: string;

  @AutoMap()
  @Column()
  password: string;

  @AutoMap()
  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];

  @AutoMap()
  @Column({ type: 'enum', enum: USER_ROLES, default: USER_ROLES.CUSTOMER })
  role: USER_ROLES;

  @AutoMap()
  @Column({ default: true })
  isActive: boolean;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;

  @AutoMap()
  @DeleteDateColumn()
  deletedAt: Date | null;
}
