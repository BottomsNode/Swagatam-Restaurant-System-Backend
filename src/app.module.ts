import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { CategoryModule } from './category/category.module';
import { TableModule } from './table/table.module';
import { StaffModule } from './staff/staff.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './config/connection.msg';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/typeorm.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CommonMapper } from './common/profile/common.mapper.service';

@Module({
  imports: [
    // For env Files
    ConfigModule.forRoot(),
    // For Database Connection
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
        return AppDataSource;
      },
    }),
    // For Automapper
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    // Other Modules
    CustomerModule,
    OrderModule,
    OrderItemModule,
    MenuItemModule,
    CategoryModule,
    TableModule,
    StaffModule
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService, CommonMapper],
  exports : [CommonMapper],
})
export class AppModule { }
