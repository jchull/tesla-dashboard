import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTagsAction, fetchSessionListAction } from '../session/actions'
import { AppState } from '../store'
import { ProductList } from '../product'
import { ProductSessionView } from './ProductSessionView'
import { Overview } from '../vehicle/Overview'
import { Tabs } from '@tesla-dashboard/components'
import { SyncPreferences } from '../account/SyncPreferences'

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch()

  const productsSelector = (store: AppState) => store.product.products
  const selectedProductIdSelector = (store: AppState) =>
    store.product.selectedProductId
  const products = useSelector(productsSelector)
  const selectedProductId = useSelector(selectedProductIdSelector)
  const tabItems = ['Overview', 'Settings', 'Activity']

  const [selectedIndex, setSelectedIndex] = useState(2)

  const viewMemo = useMemo(() => {
    switch (selectedIndex) {
      case 2:
        return <ProductSessionView />
      case 1:
        return <SyncPreferences vehicleId={selectedProductId} />
      default:
        return <Overview productId={selectedProductId} />
    }
  }, [selectedIndex])

  React.useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = products.find(
        (product) => product._id === selectedProductId
      )
      if (selectedProduct) {
        dispatch(
          fetchSessionListAction(selectedProductId, { start: 0, size: 100 })
        )
        dispatch(fetchAllTagsAction(selectedProductId))
      }
    }
  }, [selectedProductId])

  return (
    <>
      <ProductList products={products}
                   selectedProductId={selectedProductId} />
      <Tabs
        onSelect={setSelectedIndex}
        selectedIndex={selectedIndex}
        tabs={tabItems}
      />
      {viewMemo}
    </>
  )
}
