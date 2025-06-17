import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { DataSource } from 'typeorm';
console.log(process.env.DB_HOST);
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // synchronize: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
    migrationsRun: false,
    logging: true,
});