import { DatabaseSeeder } from './seeders.service';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';

async function bootstrap() {
    const app = await NestFactory.create(SeederModule);

    const DbSeeder = app.get(DatabaseSeeder);

    console.log('Seeding Users...');
    await DbSeeder.seed();

    await app.close();
    console.log('Seeding is complete.');
}
bootstrap();
