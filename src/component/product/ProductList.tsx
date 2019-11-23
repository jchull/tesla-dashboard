import React from 'react';
import {ProductListItem} from './ProductListItem';
import {SessionListView} from '../session/SessionListView';
import './ProductList.scss';
import {IVehicle} from 'tesla-dashboard-api';
import {AppState} from '../../store/types/state';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductListAction, fetchProductListStart, selectProduct} from './actions';


export const ProductList: React.FC = () => {
  const productListState = useSelector((store: AppState) => store.productList);
  const dispatch = useDispatch();

  const productSelectionHandler = (product: IVehicle) => dispatch(selectProduct(product));

  React.useEffect(() => {
    dispatch(fetchProductListAction());
  }, []);

  return (
      <div>
        <div className="product-list">
          {
            productListState.products && productListState.products.map(
                product => <ProductListItem product={product}
                                            key={product.vin}
                                            handleSelection={productSelectionHandler}
                                            selected={productListState.selectedProduct && productListState.selectedProduct.vin === product.vin}/>)
          }
        </div>
        <div className="product-view">
          <SessionListView/>
        </div>
      </div>

  );
};

