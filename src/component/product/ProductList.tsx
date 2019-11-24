import React from 'react';
import {ProductListItem} from './ProductListItem';
import './style.scss';
import {IVehicle} from 'tesla-dashboard-api';
import {useDispatch} from 'react-redux';
import {fetchProductListAction, ProductState, selectProduct} from './actions';


export const ProductList: React.FC<ProductState> = (props) => {
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

