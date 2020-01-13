import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // httpsOptions: {
    //
    // }
  });
  app.use(cookieParser());
  app.use(helmet());
  app.setGlobalPrefix('api');
  // app.use(csurf());

  await app.listen(process.env.PORT);
  console.log(`API running on port ${process.env.PORT}`)
}
bootstrap();
