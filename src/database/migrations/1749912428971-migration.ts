import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749912428971 implements MigrationInterface {
    name = 'Migration1749912428971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ALTER COLUMN "price" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ALTER COLUMN "description" SET DEFAULT 'empty'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "name" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

}
