import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750228933626 implements MigrationInterface {
    name = 'Migration1750228933626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."customer_entity_role_enum" AS ENUM('admin', 'customer')`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "role" "public"."customer_entity_role_enum" NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TYPE "public"."staff_entity_role_enum" RENAME TO "staff_entity_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."staff_entity_role_enum" AS ENUM('WAITER', 'CHEF', 'MANAGER', 'CASHIER', 'CLEANER', 'SUPPORT')`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ALTER COLUMN "role" TYPE "public"."staff_entity_role_enum" USING "role"::"text"::"public"."staff_entity_role_enum"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ALTER COLUMN "role" SET DEFAULT 'WAITER'`);
        await queryRunner.query(`DROP TYPE "public"."staff_entity_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."staff_entity_role_enum_old" AS ENUM('WAITER', 'CHEF', 'MANAGER', 'CASHIER', 'CLEANER', 'ADMIN', 'SUPPORT')`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ALTER COLUMN "role" TYPE "public"."staff_entity_role_enum_old" USING "role"::"text"::"public"."staff_entity_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ALTER COLUMN "role" SET DEFAULT 'WAITER'`);
        await queryRunner.query(`DROP TYPE "public"."staff_entity_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."staff_entity_role_enum_old" RENAME TO "staff_entity_role_enum"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."customer_entity_role_enum"`);
    }

}
