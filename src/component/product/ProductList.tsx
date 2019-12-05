import React from 'react';
import {useDispatch} from 'react-redux';

import {IVehicle} from 'tesla-dashboard-api';
import {ProductListItem} from './ProductListItem';
import {fetchProductListAction, ProductState, selectProduct} from './actions';

import './style.scss';


export const ProductList: React.FC<ProductState> = (props: ProductState) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProductListAction());
  }, []);

  return (
      <div className="product-list">
        {
          props.products.map(
              (product: IVehicle) => <ProductListItem product={product}
                                                      key={product._id}
                                                      handleSelection={() => dispatch(selectProduct(product._id))}
                                                      selected={props.selectedProductId === product._id}/>)
        }
      </div>
  );
};

