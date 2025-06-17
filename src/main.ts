import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config';
import { CommonExceptionFilter } from './common/error/exception.handler';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './modules/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // For Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // For Exception
  app.useGlobalFilters(new CommonExceptionFilter());

  // For Authentication
  app.useGlobalGuards(new AuthGuard());


  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Swagger For API Documentation')
    .addServer(`http://localhost:${configService.get('PORT')!}/`, `${configService.get('DB_NAME')} Local environment`)
    .addTag(`API's of ${configService.get('DB_NAME')}`)
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${configService.get('SWAGGER_DOCS')}`, app, documentFactory);

  await app.listen(configService.get('PORT')!);
}
bootstrap()
  .then(() => {
    console.log(`Appication Started on ${process.env.PORT}`);
  })
  .catch((error) => {
    console.error('Error starting app:', error);
  });

