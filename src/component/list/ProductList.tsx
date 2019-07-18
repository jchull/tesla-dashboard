import React from 'react';
import {ProductType} from '../../type/ProductType';
import {ProductListItem} from './ProductListItem';
import {ProductView} from '../view/ProductView';
import {QueryService} from '../../service/es/QueryService';

interface ProductListState {
  products: ProductType[],
  selectedProductId?: string
}

export const ProductList: React.SFC<ProductListState> = (props: ProductListState) => {
  const [products, setProducts] = React.useState(props.products);
  const queryService = new QueryService();

  const defaultProduct: ProductType = {
    id: '',
    name: 'No Product Selected',
    type: ''
  };
  const [selectedProduct, setSelectedProduct] = React.useState(defaultProduct);

  const productSelectionHandler = (product: ProductType) => setSelectedProduct(Object.assign({}, product));

  React.useEffect(() => {
    // TODO: promise/subscribe
    const productList = queryService.getProducts();
    setProducts(productList);
  }, []);

  React.useEffect(() => {
    if (selectedProduct) {
      console.log(`selected product: ${selectedProduct.name}`);
    }
  }, [selectedProduct]);

  return (
      <div className="products">
        <div>
          {products.map(product => <ProductListItem product={product}
                                                    key={product.id}
                                                    handleSelection={productSelectionHandler}
                                                    selected={selectedProduct && selectedProduct.id === product.id}/>)}
        </div>
        <ProductView product={selectedProduct}/>
      </div>

  );
};

