import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750153048520 implements MigrationInterface {
    name = 'Migration1750153048520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."staff_entity_role_enum" AS ENUM('WAITER', 'CHEF', 'MANAGER', 'CASHIER', 'CLEANER', 'ADMIN', 'SUPPORT')`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "role" "public"."staff_entity_role_enum" NOT NULL DEFAULT 'WAITER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."staff_entity_role_enum"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "role" character varying NOT NULL`);
    }

}
