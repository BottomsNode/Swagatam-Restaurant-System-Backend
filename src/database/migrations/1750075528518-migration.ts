import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750075528518 implements MigrationInterface {
    name = 'Migration1750075528518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_item_entity" ADD "quantityAvailable" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order_item_entity" ALTER COLUMN "quantity" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item_entity" ALTER COLUMN "quantity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "menu_item_entity" DROP COLUMN "quantityAvailable"`);
    }

}
