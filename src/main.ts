import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './configure-swagger';
import { HttpExceptionFilter } from './commun/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  configureSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
