import React from 'react';
import {ProductListItem} from './ProductListItem';
import {SessionListView} from '../session/SessionListView';
import './ProductList.scss';
import {IVehicle} from 'tesla-dashboard-api';
import {AppState} from '../../store/types/state';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductListAction, fetchProductListStart} from './actions';


export const ProductList: React.FC = () => {
  const productListState = useSelector((store: AppState) => store.productList);
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = React.useState({} as IVehicle);

  const productSelectionHandler = (product: IVehicle) => setSelectedProduct(Object.assign({}, product));

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
                                            selected={selectedProduct && selectedProduct.vin === product.vin}/>)
          }
        </div>
        <div className="product-view">
          {
            productListState.products && selectedProduct && <SessionListView vehicle={selectedProduct}/>
          }
        </div>
      </div>

  );
};

