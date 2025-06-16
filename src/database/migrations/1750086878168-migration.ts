import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750086878168 implements MigrationInterface {
    name = 'Migration1750086878168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ALTER COLUMN "quantityAvailable" SET DEFAULT '20'`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."order_entity_status_enum" AS ENUM('PENDING', 'IN PROCESS', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "status" "public"."order_entity_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."table_entity_status_enum" AS ENUM('AVAILABLE', 'OCCUPIED')`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "status" "public"."table_entity_status_enum" NOT NULL DEFAULT 'AVAILABLE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "table_entity" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."table_entity_status_enum"`);
        await queryRunner.query(`ALTER TABLE "table_entity" ADD "status" character varying NOT NULL DEFAULT 'AVAILABLE'`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."order_entity_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "status" character varying NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ALTER COLUMN "quantityAvailable" SET DEFAULT '0'`);
    }

}
