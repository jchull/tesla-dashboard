import React, {FC, useEffect, useState} from 'react';
import {Vehicle as Product} from 'tesla-dashboard-api';
import {SyncPreferences} from './SyncPreferences';
import services from '@service/service';


export const SyncPreferencesList: FC = () => {

  const [products, setProducts] = useState([] as Product[]);
  const [selectedProduct, setSelectedProduct] = useState({} as Product);

  useEffect(() => {
    const username = services.auth.getUsername();
    if (username) {
      services.queryService.getProducts()
              .then((data: Product[] | undefined) => data && setProducts(data));
    }
  }, []);

  return (
      <div>
        <h3>Product Sync Preferences</h3>

        {
          products && products.length ?
          (<div>
            {products.map(vehicle => <div key={vehicle.vin}
                                          className="clickable"
                                          onClick={() => setSelectedProduct(vehicle)}>{vehicle.display_name}</div>)}
          </div>)
                                      :
          <span>No products found</span>
        }

        {
          selectedProduct && selectedProduct._id ?
          <SyncPreferences preferences={selectedProduct.sync_preferences} vehicleId={selectedProduct.vin}/>
                                                 :
          <span>Select a product</span>
        }
      </div>
  );
};

