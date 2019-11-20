import React from 'react';
import {ProductListItem} from './ProductListItem';
import {queryService} from '@service/Services';
import {VehicleView} from '../view/VehicleView';
import './ProductList.scss';
import {IVehicle} from 'tesla-dashboard-api';
import {AppState} from '../../store/types/state';
import {useDispatch, useSelector} from 'react-redux';
import {ACTION_TYPES} from '../../store/actions';


export const ProductList: React.FC = () => {
  const productListState = useSelector((store: AppState) => store.productList);
  const dispatcher = useDispatch();

  const [selectedProduct, setSelectedProduct] = React.useState({} as IVehicle);

  const productSelectionHandler = (product: IVehicle) => setSelectedProduct(Object.assign({}, product));

  React.useEffect(() => {
    const fetchProductList = async () => {
      console.log('fetching products...');
      const productList = await queryService.getProducts();
      dispatcher({type: ACTION_TYPES.UPDATE_PRODUCT_LIST, productList});
      if (productList && productList.length) {
        setSelectedProduct(productList[0]);
      }
    };

    fetchProductList();
    setInterval(fetchProductList, 60000);
  }, []);

  React.useEffect(() => {
    if (selectedProduct.vin) {
      // TODO: action upon product selection
      // maybe start data refresh for that product only or something
    }
  }, [selectedProduct]);

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
            productListState.products && selectedProduct && <VehicleView vehicle={selectedProduct}/>
          }
        </div>
      </div>

  );
};

