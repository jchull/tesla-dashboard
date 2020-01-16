import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getMyProducts(@Request() req, @Query() query) {
    return this.productService.getMyProducts(
      req.user.username,
      query.syncUpstream
    );
  }
}
