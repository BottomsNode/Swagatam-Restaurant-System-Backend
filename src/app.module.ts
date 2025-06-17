import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './config/connection.msg';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/typeorm.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CommonMapper } from './common/profile/common.mapper.service';
import { CommonExceptionFilter } from './common/error/exception.handler';
import { CategoryModule } from './modules/category/category.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MenuItemModule } from './modules/menu-item/menu-item.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { OrderModule } from './modules/order/order.module';
import { StaffModule } from './modules/staff/staff.module';
import { TableModule } from './modules/table/table.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // For env Files
    ConfigModule.forRoot(),
    // For Authentication
    AuthModule,
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
    StaffModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
    CommonMapper,
    CommonExceptionFilter
  ],
  exports : [CommonMapper],
})
export class AppModule { }
