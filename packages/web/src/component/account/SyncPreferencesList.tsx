import React, { FC, useEffect, useState } from 'react'
import { types } from '@teslapp/common'
import services from '@teslapp/web/src/service'

export const SyncPreferencesList: FC = () => {
  const [products, setProducts] = useState([] as types.Vehicle[])
  const [selectedProduct, setSelectedProduct] = useState({} as types.Vehicle)

  useEffect(() => {
    const username = services.auth.getUsername()
    if (username) {
      services.queryService
              .getProducts()
              .then((data: types.Vehicle[] | undefined) => data && setProducts(data))
    }
  }, [])

  return (
    <div>
      <h3>Product Sync Preferences</h3>

      {products && products.length ? (
        <div>
          {products.map((vehicle) => (
            <div
              key={vehicle.vin}
              className="clickable"
              onClick={() => setSelectedProduct(vehicle)}
            >
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
  )
}
