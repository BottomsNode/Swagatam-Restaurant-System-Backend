import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750080028961 implements MigrationInterface {
    name = 'Migration1750080028961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "orderTime" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ALTER COLUMN "orderTime" DROP DEFAULT`);
    }

}
