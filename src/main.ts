import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  // With default cors settings
  const app = await NestFactory.create(AppModule, { cors: true });

  // Helmet can help protects from well-known web vulnerabilities
  // by setting HTTP headers appropriately
  app.use(helmet());

  // Swagger document for the APIs
  const options = new DocumentBuilder()
    .setTitle('Pokemon API')
    .setDescription('A publicly available service for fetching pokemon information')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
