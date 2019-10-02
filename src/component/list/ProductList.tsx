import React from 'react';
import {ProductListItem} from './ProductListItem';
import {queryService} from '@service/Services';
import {VehicleView} from '../view/VehicleView';
import './ProductList.scss';
import {IVehicle} from 'tesla-dashboard-api';
import {ProductListState} from '../../type/state';


export const ProductList: React.FC<ProductListState> = props => {
  const [products, setProducts] = React.useState(props.products);

  const [selectedProduct, setSelectedProduct] = React.useState({} as IVehicle);

  const productSelectionHandler = (product: IVehicle) => setSelectedProduct(Object.assign({}, product));

  React.useEffect(() => {
    const fetchProductList = async () => {
      const productList = await queryService.getProducts();
      setProducts(productList);
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
          {products && products.map(product => <ProductListItem product={product}
                                                                key={product.vin}
                                                                handleSelection={productSelectionHandler}
                                                                selected={selectedProduct && selectedProduct.vin === product.vin}/>)}
        </div>
        <div className="product-view">
          {products && selectedProduct && <VehicleView vehicle={selectedProduct}/>
          }
        </div>
      </div>

  );
};

