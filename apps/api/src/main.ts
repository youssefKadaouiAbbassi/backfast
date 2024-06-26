import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sw = await import('@nestjs/swagger');

  const config = new sw.DocumentBuilder()
    .setTitle(process.env.PROJECT_NAME)
    .setDescription(`${process.env.PROJECT_NAME} API Documentation`)
    .setVersion('0.0.1')
    .addBearerAuth({ bearerFormat: 'JWT', type: 'http' })
    .build();
  const document = sw.SwaggerModule.createDocument(app, config);
  sw.SwaggerModule.setup('api', app, document);

  await app.listen(process.env.API_PORT || 9000);
}
bootstrap();
