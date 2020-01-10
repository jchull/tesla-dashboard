import {Controller, Get, Param, Request, UseGuards} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getMyProducts(@Request() req) {
    return this.productService.getMyProducts(req.user.username);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get(':id/session')
  getRecentSessions(@Request() req, @Param('id') id) {
    return this.productService.findRecentSessions(req.user.username, id, req.query.limit/1);
  }

}
