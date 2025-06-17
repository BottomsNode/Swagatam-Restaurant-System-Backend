import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuthMiddleware } from './common/middlewares/middleware.service';
import { LoggingMiddleware } from './common/middlewares/loggin.middleware.service';
import { CustomerController } from './modules/customer/customer.controller';
import { OrderController } from './modules/order/order.controller';
import { OrderItemController } from './modules/order-item/order-item.controller';
import { MenuItemController } from './modules/menu-item/menu-item.controller';
import { CategoryController } from './modules/category/category.controller';
import { TableController } from './modules/table/table.controller';
import { StaffController } from './modules/staff/staff.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptors } from './common/interceptors/logging.interceptor';

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


    // For Rate Limiting
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
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
    CommonExceptionFilter,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptors
  
    },
  ],
  exports: [CommonMapper],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CustomerController),
      consumer.apply(AuthMiddleware).forRoutes(OrderController),
      consumer.apply(AuthMiddleware).forRoutes(OrderItemController),
      consumer.apply(AuthMiddleware).forRoutes(MenuItemController),
      consumer.apply(AuthMiddleware).forRoutes(CategoryController),
      consumer.apply(AuthMiddleware).forRoutes(TableController),
      consumer.apply(AuthMiddleware).forRoutes(StaffController),
      consumer.apply(LoggingMiddleware).forRoutes('*');
    // OR for a specific route:
    // .forRoutes({ path: 'your-route', method: RequestMethod.GET });
  }
}
