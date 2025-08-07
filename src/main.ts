import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { RpcGlobalExceptionInterceptor } from './common/interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  app.useGlobalInterceptors(new RpcGlobalExceptionInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Swagger For API Documentation')
    // .addServer(`http://localhost:${configService.get('PORT')!}/`, `${configService.get('DB_NAME')} Local environment`)
    .addTag(`API's of ${configService.get('DB_NAME')}`)
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${configService.get('SWAGGER_DOCS')}`, app, documentFactory);

  await app.listen(configService.get('PORT')!);

  // Start background tasks
  runHeartbeat();
  monitorMemory();
}
bootstrap()
  .then(() => {
    console.log(`Appication Started on ${process.env.PORT}`);
  })
  .catch((error) => {
    console.error('Error starting app:', error);
  });

function runHeartbeat(): void {
  let count = 1;
  setInterval(() => {
    console.log(`💓 Application heartbeat... (${count++})`);
  }, 10000);
}

function monitorMemory(): void {
  setInterval(() => {
    const used = process.memoryUsage();
    console.log(
      `📊 Memory Usage - Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    );
  }, 60000);
}
