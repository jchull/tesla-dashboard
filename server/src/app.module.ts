import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { ProductController } from './product/product.controller';
import { AccountService } from './account/account.service';
import { ProductService } from './product/product.service';

@Module({
  imports: [],
  controllers: [AppController, AccountController, ProductController],
  providers: [AppService, AccountService, ProductService],
})
export class AppModule {}
