import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../modules/category/entities/category.entity';
import { CustomerEntity } from '../modules/customer/entities/customer.entity';
import { MenuItemEntity } from '../modules/menu-item/entities/menu_item.entity';
import { StaffEntity } from '../modules/staff/entities/staff..entity';
import { TableEntity } from '../modules/table/entities/table.entity';
import { DatabaseSeeder } from './seeders.service';
import { AppDataSource } from '../config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([
            CustomerEntity,
            StaffEntity,
            TableEntity,
            MenuItemEntity,
            CategoryEntity,
        ]),
    ],
    providers: [DatabaseSeeder],
    exports: [DatabaseSeeder],
})
export class SeederModule { }