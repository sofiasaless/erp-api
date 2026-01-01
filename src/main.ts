import { NestFactory } from '@nestjs/core';
import 'tsconfig-paths/register';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:8080',
      'https://erpadmin-hub.vercel.app'
    ],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  const port = process.env.PORT || 3001;

  // MUITO IMPORTANTE NO CLOUD RUN:
  await app.listen(port, '0.0.0.0');

  console.log(`API rodando na porta ${port}`);
}

bootstrap();