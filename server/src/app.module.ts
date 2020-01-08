import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';

import {ConfigurationModule} from './configuration/configuration.module';
import {ProductModule} from './product/product.module';
import {AccountModule} from './account/account.module';
import { AuthModule } from './auth/auth.module';

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
          controllers: [AppController],
          providers: [AppService]
        })
export class AppModule {
}
