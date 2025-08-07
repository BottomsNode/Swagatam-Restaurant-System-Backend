import { CreateCategoryDto } from '@/modules/category/dto/category.create.dto';
import { CategoryDto } from '@/modules/category/dto/category.dto';
import { CategoryResponseDto } from '@/modules/category/dto/category.res.dto';
import { CategoryEntity } from '@/modules/category/entities/category.entity';
import { CreateCustomerDto } from '@/modules/customer/dto/customer.create.dto';
import { CustomerDto } from '@/modules/customer/dto/customer.dto';
import { CustomerResponseDto } from '@/modules/customer/dto/customer.res.dto';
import { CustomerEntity } from '@/modules/customer/entities/customer.entity';
import { CreateMenuItemDto } from '@/modules/menu-item/dto/menuItem.create.dto';
import { MenuItemDto } from '@/modules/menu-item/dto/menuItem.dto';
import { MenuItemResponseDto } from '@/modules/menu-item/dto/menuItem.res.dto';
import { MenuItemEntity } from '@/modules/menu-item/entities/menu_item.entity';
import { CreateOrderItemDto } from '@/modules/order-item/dto/orderItem.create.dto';
import { OrderItemDto } from '@/modules/order-item/dto/orderItem.dto';
import { OrderItemResponseDto } from '@/modules/order-item/dto/orderItem.res.dto';
import { OrderItemEntity } from '@/modules/order-item/entities/order_item.entity';
import { CreateOrderDto } from '@/modules/order/dto/order.create.dto';
import { OrderDto } from '@/modules/order/dto/order.dto';
import { OrderResponseDto } from '@/modules/order/dto/order.res.dto';
import { OrderEntity } from '@/modules/order/entities/order.entity';
import { StaffResponseDto } from '@/modules/staff/dto/staf.res.dto';
import { CreateStaffDto } from '@/modules/staff/dto/staff.create.dto';
import { StaffDto } from '@/modules/staff/dto/staff.dto';
import { StaffEntity } from '@/modules/staff/entities/staff..entity';
import { CreateTableDto } from '@/modules/table/dto/table.create.dto';
import { TableDto } from '@/modules/table/dto/table.dto';
import { TableResponseDto } from '@/modules/table/dto/table.res.dto';
import { TableEntity } from '@/modules/table/entities/table.entity';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

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
          mapFrom((src) =>
            src.menuItems?.map((item) =>
              mapper.map(item, MenuItemEntity, MenuItemDto),
            ),
          ),
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
          mapFrom((src) =>
            src.orders?.map((order) =>
              mapper.map(order, OrderEntity, OrderDto),
            ),
          ),
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
          mapFrom((src) => ({ id: src.categoryId }) as CategoryEntity),
        ),
      );
      createMap(
        mapper,
        MenuItemEntity,
        MenuItemResponseDto,
        forMember(
          (dest) => dest.category,
          mapFrom((src) =>
            mapper.map(src.category, CategoryEntity, CategoryDto),
          ),
        ),
        forMember(
          (dest) => dest.orderItems,
          mapFrom((src) =>
            src.orderItems?.map((item) =>
              mapper.map(item, OrderItemEntity, OrderItemDto),
            ),
          ),
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
          mapFrom((src) => ({ id: src.customerId }) as CustomerEntity),
        ),
        forMember(
          (dest) => dest.staff,
          mapFrom((src) => ({ id: src.staffId }) as StaffEntity),
        ),
        forMember(
          (dest) => dest.items,
          mapFrom((src) =>
            src.items?.map((item) =>
              mapper.map(item, CreateOrderItemDto, OrderItemEntity),
            ),
          ),
        ),
      );
      createMap(
        mapper,
        OrderEntity,
        OrderResponseDto,
        forMember(
          (dest) => dest.customer,
          mapFrom((src) =>
            mapper.map(src.customer, CustomerEntity, CustomerDto),
          ),
        ),
        forMember(
          (dest) => dest.staff,
          mapFrom((src) => mapper.map(src.staff, StaffEntity, StaffDto)),
        ),
        forMember(
          (dest) => dest.items,
          mapFrom((src) =>
            src.items?.map((item) =>
              mapper.map(item, OrderItemEntity, OrderItemResponseDto),
            ),
          ),
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
          mapFrom((src) => ({ id: src.menuItemId }) as MenuItemEntity),
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
          mapFrom((src) =>
            mapper.map(src.menuItem, MenuItemEntity, MenuItemDto),
          ),
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
          mapFrom((src) =>
            src.orders?.map((order) =>
              mapper.map(order, OrderEntity, OrderDto),
            ),
          ),
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
          mapFrom((src) =>
            src.orders?.map((order) =>
              mapper.map(order, OrderEntity, OrderDto),
            ),
          ),
        ),
      );
    };
  }
}
