import {Controller, Get} from '@nestjs/common';
import {ProductService} from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get()
  getMyProducts() {
    return this.productService.getMyProducts('jchull');
  }
}
