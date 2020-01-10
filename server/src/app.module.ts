import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';

import {ConfigurationModule} from './configuration/configuration.module';
import {ProductModule} from './product/product.module';
import {AccountModule} from './account/account.module';
import {AuthModule} from './auth/auth.module';
import {FrontEndMiddlewareMiddleware} from './middleware/front-end-middleware.middleware';
import {LoggerMiddleware} from './middleware/logger.middleware';

@Module({
          imports: [
            ConfigModule.forRoot({
                                   envFilePath: `./env/${process.env.NODE_ENV || 'development'}.env`
                                 }),
            MongooseModule.forRootAsync({
                                          useFactory: async () => ({
                                            uri: process.env.DB_CONN,
                                            useNewUrlParser: true
                                          })
                                        }),
            ConfigurationModule,
            ProductModule,
            AccountModule,
            AuthModule
          ],
          controllers: [AppController]
        })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, FrontEndMiddlewareMiddleware)
            .forRoutes(
                {
                  path: '/**',
                  method: RequestMethod.ALL
                }
            );
  }
}
