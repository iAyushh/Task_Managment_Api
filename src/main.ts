import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {RequestLoggerMiddleware} from './common/middleware/request-logger.middleware'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted:true,
    transform : true,
  }))
  
  app.use(new RequestLoggerMiddleware().use);
  await(app.listen(3000));
  console.log('App is running on port 3000');
  
}
bootstrap();
