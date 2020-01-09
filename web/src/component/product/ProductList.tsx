import React from 'react';
import {useDispatch} from 'react-redux';

import {Product} from '@model/index';

import {ProductListItem} from './ProductListItem';
import {fetchProductListAction, ProductState, selectProduct} from './actions';

import './product.style.scss';


export const ProductList: React.FC<ProductState> = (props: ProductState) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProductListAction());
  }, []);

  return (
      <div className="product-list">
        {
          props.products.map(
              (product: Product) => <ProductListItem product={product}
                                                     key={product._id}
                                                     handleSelection={() => dispatch(selectProduct(product._id))}
                                                     selected={props.selectedProductId === product._id}/>)
        }
      </div>
  );
};

