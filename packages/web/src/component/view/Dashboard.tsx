import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllTagsAction,
  fetchSessionListAction,
  fetchSessionListClear
} from '@teslapp/web/src/component/session/actions'
import { AppState } from '@teslapp/web/src/store'
import { ProductList } from '@teslapp/web/src/component/product'
import { ProductSessionView } from './ProductSessionView'

export enum DASHBOARD {
  OVERVIEW = 'OVERVIEW',
  SESSION = 'SESSION'
}

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch()

  const productsSelector = (store: AppState) => store.product.products
  const selectedProductIdSelector = (store: AppState) =>
    store.product.selectedProductId
  const products = useSelector(productsSelector)
  const selectedProductId = useSelector(selectedProductIdSelector)

  const [dashboardView, setDashboardView] = useState(DASHBOARD.SESSION)

  const viewMemo = useMemo(() => {
    switch (dashboardView) {
      case DASHBOARD.SESSION:
        return <ProductSessionView/>
      case DASHBOARD.OVERVIEW:
        return <h2>overview</h2>
    }
  }, [dashboardView])

  React.useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = products.find(
        (product) => product._id === selectedProductId
      )
      if (selectedProduct && dashboardView) {
        dispatch(
          fetchSessionListAction(selectedProductId, { start: 0, size: 100 }))
        dispatch(fetchAllTagsAction(selectedProductId))
      }
    }
  }, [selectedProductId])

  const clear = () => dispatch(fetchSessionListClear())

  return (
    <>
      <ProductList products={products}
                   selectedProductId={selectedProductId}/>
      <div className='tab-buttons'>
        <button onClick={() => setDashboardView(DASHBOARD.OVERVIEW)}
                className={dashboardView === DASHBOARD.OVERVIEW ? 'selected' : ''}>
          Overview
        </button>
        <button onClick={() => clear() && setDashboardView(DASHBOARD.SESSION)}
                className={dashboardView === DASHBOARD.SESSION ? 'selected' : ''}>
          Activity
        </button>
      </div>
      {viewMemo}
    </>
  )
}
