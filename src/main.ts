import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { RpcGlobalExceptionInterceptor } from './common/interceptors/exception.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT') || 3000;
  const swaggerPath: string = configService.get('SWAGGER_DOCS') || 'api/docs';

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  app.useGlobalInterceptors(new RpcGlobalExceptionInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Swagger For API Documentation')
    .addTag(`API's of ${configService.get('DB_NAME')}`)
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerPath, app, swaggerDoc);

  await app.listen(port);

  console.log(`🚀 Application started on port ${port}`);
  console.log(`📘 Swagger docs available at /${swaggerPath}`);

  runHeartbeat();
  monitorMemory();
}

bootstrap().catch((error) => {
  console.error('❌ Error starting app:', error);
});

function runHeartbeat(): void {
  let count = 1;
  setInterval(() => {
    console.log(`✅ [Heartbeat] Application is alive... (${count++})`);
  }, 10_000);
}

function monitorMemory(): void {
  setInterval(() => {
    const used = process.memoryUsage();
    console.log(
      `📈 [Memory] Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB | RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB`,
    );
  }, 60_000);
}
