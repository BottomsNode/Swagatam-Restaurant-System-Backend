import { AutoMap } from '@automapper/classes';
import { MenuItemEntity } from '../../../modules/menu-item/entities/menu_item.entity';
import { OrderEntity } from '../../../modules/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderItemEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;

  @ManyToOne(() => MenuItemEntity, (menuItem) => menuItem.orderItems)
  menuItem: MenuItemEntity;

  @AutoMap()
  @Column({ default: 0 })
  quantity: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceAtOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
