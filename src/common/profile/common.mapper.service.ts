import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "src/category/dto/category.create.dto";
import { CategoryDto } from "src/category/dto/category.dto";
import { CategoryResponseDto } from "src/category/dto/category.res.dto";
import { CategoryEntity } from "src/category/entities/category.entity";
import { CreateCustomerDto } from "src/customer/dto/customer.create.dto";
import { CustomerDto } from "src/customer/dto/customer.dto";
import { CustomerResponseDto } from "src/customer/dto/customer.res.dto";
import { CustomerEntity } from "src/customer/entities/customer.entity";
import { CreateMenuItemDto } from "src/menu-item/dto/menuItem.create.dto";
import { MenuItemDto } from "src/menu-item/dto/menuItem.dto";
import { MenuItemResponseDto } from "src/menu-item/dto/menuItem.res.dto";
import { MenuItemEntity } from "src/menu-item/entities/menu_item.entity";
import { CreateOrderItemDto } from "src/order-item/dto/orderItem.create.dto";
import { OrderItemDto } from "src/order-item/dto/orderItem.dto";
import { OrderItemResponseDto } from "src/order-item/dto/orderItem.res.dto";
import { OrderItemEntity } from "src/order-item/entities/order_item.entity";
import { CreateOrderDto } from "src/order/dto/order.create.dto";
import { OrderDto } from "src/order/dto/order.dto";
import { OrderResponseDto } from "src/order/dto/order.res.dto";
import { OrderEntity } from "src/order/entities/order.entity";
import { StaffResponseDto } from "src/staff/dto/staf.res.dto";
import { CreateStaffDto } from "src/staff/dto/staff.create.dto";
import { StaffDto } from "src/staff/dto/staff.dto";
import { StaffEntity } from "src/staff/entities/staff..entity";
import { CreateTableDto } from "src/table/dto/table.create.dto";
import { TableDto } from "src/table/dto/table.dto";
import { TableResponseDto } from "src/table/dto/table.res.dto";
import { TableEntity } from "src/table/entities/table.entity";

@Injectable()
export class CommonMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper: Mapper) => {
            // Category Mappings
            createMap(mapper, CategoryEntity, CategoryDto);
            createMap(mapper, CategoryDto, CategoryEntity);
            createMap(mapper, CreateCategoryDto, CategoryEntity);
            createMap(
                mapper,
                CategoryEntity,
                CategoryResponseDto,
                forMember(
                    (dest) => dest.menuItems,
                    mapFrom((src) => src.menuItems?.map((item) => mapper.map(item, MenuItemEntity, MenuItemDto))),
                ),
            );

            // Customer Mappings
            createMap(mapper, CreateCustomerDto, CustomerEntity);
            createMap(mapper, CustomerDto, CustomerEntity);
            createMap(mapper, CustomerEntity, CustomerDto);
            createMap(
                mapper,
                CustomerEntity,
                CustomerResponseDto,
                forMember(
                    (dest) => dest.orders,
                    mapFrom((src) => src.orders?.map((order) => mapper.map(order, OrderEntity, OrderDto))),
                ),
            );

            // MenuItem Mappings
            createMap(mapper, MenuItemEntity, MenuItemDto);
            createMap(mapper, MenuItemDto, MenuItemEntity);
            createMap(
                mapper,
                CreateMenuItemDto,
                MenuItemEntity,
                forMember(
                    (dest) => dest.category,
                    mapFrom((src) => ({ id: src.categoryId } as CategoryEntity)),
                ),
            );
            createMap(
                mapper,
                MenuItemEntity,
                MenuItemResponseDto,
                forMember(
                    (dest) => dest.category,
                    mapFrom((src) => mapper.map(src.category, CategoryEntity, CategoryDto)),
                ),
                forMember(
                    (dest) => dest.orderItems,
                    mapFrom((src) => src.orderItems?.map((item) => mapper.map(item, OrderItemEntity, OrderItemDto))),
                ),
            );

            // Order Mappings
            createMap(mapper, OrderEntity, OrderDto);
            createMap(mapper, OrderDto, OrderEntity);
            createMap(
                mapper,
                CreateOrderDto,
                OrderEntity,
                forMember(
                    (dest) => dest.customer,
                    mapFrom((src) => ({ id: src.customerId } as CustomerEntity)),
                ),
                forMember(
                    (dest) => dest.staff,
                    mapFrom((src) => ({ id: src.staffId } as StaffEntity)),
                ),
                forMember(
                    (dest) => dest.items,
                    mapFrom((src) => src.items?.map((item) => mapper.map(item, CreateOrderItemDto, OrderItemEntity))),
                ),
            );
            createMap(
                mapper,
                OrderEntity,
                OrderResponseDto,
                forMember(
                    (dest) => dest.customer,
                    mapFrom((src) => mapper.map(src.customer, CustomerEntity, CustomerDto)),
                ),
                forMember(
                    (dest) => dest.staff,
                    mapFrom((src) => mapper.map(src.staff, StaffEntity, StaffDto)),
                ),
                forMember(
                    (dest) => dest.items,
                    mapFrom((src) => src.items?.map((item) => mapper.map(item, OrderItemEntity, OrderItemResponseDto))),
                ),
            );

            // OrderItem Mappings
            createMap(mapper, OrderItemEntity, OrderItemDto);
            createMap(mapper, OrderItemDto, OrderItemEntity);
            createMap(
                mapper,
                CreateOrderItemDto,
                OrderItemEntity,
                forMember(
                    (dest) => dest.menuItem,
                    mapFrom((src) => ({ id: src.menuItemId } as MenuItemEntity)),
                ),
            );
            createMap(
                mapper,
                OrderItemEntity,
                OrderItemResponseDto,
                forMember(
                    (dest) => dest.order,
                    mapFrom((src) => mapper.map(src.order, OrderEntity, OrderDto)),
                ),
                forMember(
                    (dest) => dest.menuItem,
                    mapFrom((src) => mapper.map(src.menuItem, MenuItemEntity, MenuItemDto)),
                ),
            );

            // Staff Mappings
            createMap(mapper, StaffEntity, StaffDto);
            createMap(mapper, StaffDto, StaffEntity);
            createMap(mapper, CreateStaffDto, StaffEntity);
            createMap(
                mapper,
                StaffEntity,
                StaffResponseDto,
                forMember(
                    (dest) => dest.orders,
                    mapFrom((src) => src.orders?.map((order) => mapper.map(order, OrderEntity, OrderDto))),
                ),
            );

            // Table Mappings
            createMap(mapper, TableEntity, TableDto);
            createMap(mapper, TableDto, TableEntity);
            createMap(mapper, CreateTableDto, TableEntity);
            createMap(
                mapper,
                TableEntity,
                TableResponseDto,
                forMember(
                    (dest) => dest.orders,
                    mapFrom((src) => src.orders?.map((order) => mapper.map(order, OrderEntity, OrderDto))),
                ),
            );
        };
    }
}