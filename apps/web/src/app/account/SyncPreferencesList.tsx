import React, { FC, useEffect, useState } from 'react';
import { Vehicle } from '@tesla-dashboard/types';
import { services } from '@tesla-dashboard/client';

export const SyncPreferencesList: FC = () => {
  const [products, setProducts] = useState([] as Vehicle[]);
  const [selectedProduct, setSelectedProduct] = useState({} as Vehicle);

  useEffect(() => {
    const username = services.auth.getUsername();
    if (username) {
      services.queryService.getProducts().then((data: Vehicle[] | undefined) => data && setProducts(data));
    }
  }, []);

  return (
    <div>
      <h3>Product Sync Preferences</h3>

      {products && products.length ? (
        <div>
          {products.map((vehicle) => (
            <div key={vehicle.vin} className="clickable" onClick={() => setSelectedProduct(vehicle)}>
              {vehicle.display_name}
            </div>
          ))}
        </div>
      ) : (
        <span>No products found</span>
      )}

      {/*{*/}
      {/*  selectedProduct && selectedProduct._id ?*/}
      {/*  <SyncPreferences preferences={selectedProduct.sync_preferences} vehicleId={selectedProduct.vin}/>*/}
      {/*                                         :*/}
      {/*  <span>Select a product</span>*/}
      {/*}*/}
    </div>
  );
};
