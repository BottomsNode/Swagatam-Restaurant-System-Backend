import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749901283979 implements MigrationInterface {
    name = 'Migration1749901283979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD "priceAtOrder" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD CONSTRAINT "UQ_a993f7fb53c118b3112843816ac" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "totalAmount" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "status" character varying NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "status" character varying NOT NULL DEFAULT 'AVAILABLE'`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP CONSTRAINT "UQ_a993f7fb53c118b3112843816ac"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP COLUMN "priceAtOrder"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "isActive"`);
    }

}
