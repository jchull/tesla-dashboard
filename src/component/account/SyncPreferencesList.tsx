import React, {FC, useEffect, useState} from 'react';
import {ISyncPreferences, IVehicle, DEFAULT_SYNC_PREFERENCES} from 'tesla-dashboard-api';
import {SyncPreferences} from './SyncPreferences';
import {authenticationService, queryService} from '@service/Services';


export const SyncPreferencesList: FC = props => {

  const [products, setProducts] = useState([] as unknown as [IVehicle]);
  const [selectedProduct, setSelectedProduct] = useState({} as IVehicle);

  useEffect(() => {
    const username = authenticationService.getUsername();
    if (username) {
      queryService.getProducts()
                 .then((data: [IVehicle] | undefined) => data && setProducts(data));
    }
  }, []);

  return (
      <div>
        <h3>Product Sync Preferences</h3>

        {
          products && products.length ?
              (<div>
                {products.map(vehicle => <div key={vehicle.id_s}
                                              onClick={() => setSelectedProduct(vehicle)}>{vehicle.display_name}</div>)}
              </div>)
              :
              <span>No products found</span>
        }

        {
          selectedProduct && selectedProduct._id ?
              <SyncPreferences preferences={selectedProduct.sync_preferences} vehicleId={selectedProduct.id_s}/>
              :
              <span>Select a product</span>
        }
      </div>
  );
};

