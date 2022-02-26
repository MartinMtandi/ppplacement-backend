import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './utils/transform.interceptors';
import { TimeoutInterceptor } from './utils/timeout.interceptors';
import { AccessTokenGuard } from './utils/guards';
import path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app =  await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor(), new TimeoutInterceptor());
  app.setGlobalPrefix('api');
  const reflector = new Reflector();
  app.useGlobalGuards(new AccessTokenGuard(reflector));

  app.useStaticAssets(path.join(process.cwd(), 'fileStorage'), {prefix:'/fileStorage'})

  const options = new DocumentBuilder().setTitle('Priority API Documentation').setDescription('Priority Professional Placement backend business logic').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);

  const configService: ConfigService = app.get(ConfigService);
  
  await app.listen(configService.get('PORT'));
}

bootstrap();
