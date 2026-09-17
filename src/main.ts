import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './configure-swagger';
import { configureApp } from './configure-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureApp(app);
  configureSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
