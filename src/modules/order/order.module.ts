import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { AuthModule } from '../auth/auth.module';
import { TableEntity } from '../table/entities/table.entity';
import { MenuItemEntity } from '../menu-item/entities/menu_item.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([OrderEntity]),
    TypeOrmModule.forFeature([OrderEntity, MenuItemEntity, TableEntity]),
    AuthModule,
    //   AutomapperModule.forRoot({
    //     strategyInitializer: classes(),
    // }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
