import { Faker } from '@faker-js/faker';
import { en } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CategoryEntity } from '../modules/category/entities/category.entity';
import { CustomerEntity } from '../modules/customer/entities/customer.entity';
import { MenuItemEntity } from '../modules/menu-item/entities/menu_item.entity';
import {
  StaffEntity,
  STAFF_ROLES,
} from '../modules/staff/entities/staff..entity';
import {
  TableEntity,
  TableStatus,
} from '../modules/table/entities/table.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseSeeder {
  private readonly logger = new Logger(DatabaseSeeder.name);
  private readonly faker = new Faker({ locale: [en] });

  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
    @InjectRepository(TableEntity)
    private readonly tableRepository: Repository<TableEntity>,
    @InjectRepository(MenuItemEntity)
    private readonly menuItemRepository: Repository<MenuItemEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async seed() {
    try {
      // await this.clearTables();
      const categories = await this.seedCategories();
      await this.seedMenuItems(categories);
      await this.seedTables();
      await this.seedCustomers();
      await this.seedStaff();
      this.logger.log('Database seeding completed successfully');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Seeding failed: ${error.message}`);
        throw error;
      }
    }
  }

  private async clearTables() {
    await this.customerRepository.query('TRUNCATE TABLE customer CASCADE');
    // await this.staffRepository.query('TRUNCATE TABLE staff CASCADE');
    await this.tableRepository.query('TRUNCATE TABLE table CASCADE');
    await this.menuItemRepository.query('TRUNCATE TABLE menu_item CASCADE');
    await this.categoryRepository.query('TRUNCATE TABLE category CASCADE');
    this.logger.log('Cleared all tables');
  }

  private async seedCategories(): Promise<CategoryEntity[]> {
    const categories = [
      { name: 'Appetizers' },
      { name: 'Main Course' },
      { name: 'Desserts' },
      { name: 'Beverages' },
      { name: 'Salads' },
    ];

    const savedCategories = await this.categoryRepository.save(
      categories.map((category) => this.categoryRepository.create(category)),
    );
    this.logger.log(`Seeded ${savedCategories.length} categories`);
    return savedCategories;
  }

  private async seedMenuItems(categories: CategoryEntity[]) {
    const menuItems = Array.from({ length: 20 }, () => ({
      name: this.faker.food.dish(),
      price: parseFloat(
        this.faker.number.float({ min: 5, max: 30 }).toFixed(2),
      ),
      description: this.faker.lorem.sentence(),
      quantityAvailable: this.faker.number.int({ min: 50, max: 200 }),
      category: this.faker.helpers.arrayElement(categories),
    }));

    await this.menuItemRepository.save(
      menuItems.map((item) => this.menuItemRepository.create(item)),
    );
    this.logger.log(`Seeded ${menuItems.length} menu items`);
  }

  private async seedTables() {
    const tables = Array.from({ length: 10 }, (_, index) => ({
      tableNumber: index + 1,
      status: index < 8 ? TableStatus.AVAILABLE : TableStatus.OCCUPIED, // 80% available
    }));

    await this.tableRepository.save(
      tables.map((table) => this.tableRepository.create(table)),
    );
    this.logger.log(`Seeded ${tables.length} tables`);
  }

  private async seedCustomers() {
    const customers = await Promise.all(
      Array.from({ length: 10 }, async () => {
        const email = this.faker.internet.email();
        const password = await bcrypt.hash('password123', 10); // Default password for testing
        return {
          email,
          password,
          name: this.faker.person.fullName(),
          phone: this.faker.phone.number(),
        };
      }),
    );

    await this.customerRepository.save(
      customers.map((customer) => this.customerRepository.create(customer)),
    );
    this.logger.log(`Seeded ${customers.length} customers`);
  }

  private async seedStaff() {
    const staffRoles = Object.values(STAFF_ROLES);
    const staff = Array.from({ length: 3 }, (_, index) => ({
      name: this.faker.person.fullName(),
      role: staffRoles[index % staffRoles.length] as STAFF_ROLES,
      email: this.faker.internet.email(),
    }));

    await this.staffRepository.save(
      staff.map((staffMember) => this.staffRepository.create(staffMember)),
    );
    this.logger.log(`Seeded ${staff.length} staff members`);
  }
}
