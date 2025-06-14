import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749900458912 implements MigrationInterface {
    name = 'Migration1749900458912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_8898b6830f057f3f5c239796fa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_item_entity" ("id" SERIAL NOT NULL, "name" TIMESTAMP NOT NULL, "price" numeric NOT NULL, "categoryId" integer, CONSTRAINT "PK_2ba0b234fd10db19e34c8f9db6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item_entity" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "orderId" integer, "menuItemId" integer, CONSTRAINT "PK_c12e105219e59720676c72957dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staff_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a1ba12082b9e174c89c35fa132e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_entity" ("id" SERIAL NOT NULL, "orderTime" TIMESTAMP NOT NULL, "customerId" integer, "tableId" integer, "staffId" integer, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "table_entity" ("id" SERIAL NOT NULL, "tableNumber" integer NOT NULL, CONSTRAINT "PK_10293e0f5eae7e9dec7cec1d7e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD CONSTRAINT "FK_808464b18c6a7894f05659eb9cf" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD CONSTRAINT "FK_cd7ee8cfd1250200aa78d806f8d" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ADD CONSTRAINT "FK_2a3ac55bc269ac3c23f3ef54993" FOREIGN KEY ("menuItemId") REFERENCES "menu_item_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_4480b7afbd07c9d3dfa5324862a" FOREIGN KEY ("customerId") REFERENCES "customer_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_9494ed3971caa504622afff731f" FOREIGN KEY ("tableId") REFERENCES "table_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_dacebecd5e01f3b00c224ff9511" FOREIGN KEY ("staffId") REFERENCES "staff_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_dacebecd5e01f3b00c224ff9511"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_9494ed3971caa504622afff731f"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_4480b7afbd07c9d3dfa5324862a"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP CONSTRAINT "FK_2a3ac55bc269ac3c23f3ef54993"`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" DROP CONSTRAINT "FK_cd7ee8cfd1250200aa78d806f8d"`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP CONSTRAINT "FK_808464b18c6a7894f05659eb9cf"`);
        await queryRunner.query(`DROP TABLE "table_entity"`);
        await queryRunner.query(`DROP TABLE "order_entity"`);
        await queryRunner.query(`DROP TABLE "staff_entity"`);
        await queryRunner.query(`DROP TABLE "order_item_entity"`);
        await queryRunner.query(`DROP TABLE "menu_item_entity"`);
        await queryRunner.query(`DROP TABLE "category_entity"`);
        await queryRunner.query(`DROP TABLE "customer_entity"`);
    }

}
