import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let document: OpenAPIObject;
    const swaggerInfo = 'swagger';
    const options = new DocumentBuilder()
      .setTitle('Pipedrive Api')
      .setDescription('Pipedrive Swagger Api')
      .setVersion('1')
      .build();
    document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);
}
bootstrap();
