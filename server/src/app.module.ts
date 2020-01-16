import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';

import { ConfigurationModule } from './configuration/configuration.module';
import { ProductModule } from './product/product.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { FrontEndMiddlewareMiddleware } from './middleware/front-end-middleware.middleware';
import { TeslaAccountModule } from './tesla-account/tesla-account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/${process.env.NODE_ENV || 'development'}.env`
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = `mongodb://tsla:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/tesladb`;
        return {
          uri,
          useNewUrlParser: true
        };
      }
    }),
    ConfigurationModule,
    ProductModule,
    AccountModule,
    AuthModule,
    SessionModule,
    TeslaAccountModule
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, FrontEndMiddlewareMiddleware).forRoutes({
      path: '/**',
      method: RequestMethod.ALL
    });
  }
}
