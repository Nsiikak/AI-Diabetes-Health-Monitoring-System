/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import { RolesGuard } from './auth/roles.guard';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  // app.useGlobalGuards(new JwtAuthGuard());

  // // Apply RolesGuard globally
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new RolesGuard(reflector));

  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: 'http://localhost:8080' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(port, () => console.log(`running on port ${port}`));
}
bootstrap();
