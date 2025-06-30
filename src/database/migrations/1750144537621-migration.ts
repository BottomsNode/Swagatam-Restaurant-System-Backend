import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750144537621 implements MigrationInterface {
    name = 'Migration1750144537621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD CONSTRAINT "UQ_984b2b39df96ed36ab62e7834a3" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP CONSTRAINT "UQ_984b2b39df96ed36ab62e7834a3"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "password"`);
    }

}
