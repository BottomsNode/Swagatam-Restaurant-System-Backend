import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './config/connection.msg';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/typeorm.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CommonMapper } from './common/profile/common.mapper.service';
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
import { ConsoleModule } from 'nestjs-console';
import { SeederModule } from './seeders/seeder.module';
import { SystemRoleGuard } from './modules/auth/guards/sys-role.guard';
import { LoggerModule, Params } from 'nestjs-pino';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    SeederModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptors

    },
    {
      provide: APP_GUARD,
      useClass: SystemRoleGuard
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
