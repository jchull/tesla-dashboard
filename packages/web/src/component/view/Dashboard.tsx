import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessionListAction } from '@teslapp/web/src/component/session/actions';
import { AppState } from '@teslapp/web/src/store';
import { ProductList } from '@teslapp/web/src/component/product';
import { ProductSessionView } from './ProductSessionView';

export enum DASHBOARD {
  OVERVIEW = 'OVERVIEW',
  SESSION = 'SESSION'
}

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const productsSelector = (store: AppState) => store.product.products;
  const selectedProductIdSelector = (store: AppState) =>
    store.product.selectedProductId;
  const products = useSelector(productsSelector);
  const selectedProductId = useSelector(selectedProductIdSelector);

  const [dashboardView, setDashboardView] = useState(DASHBOARD.OVERVIEW);

  const viewMemo = useMemo(() => {
    switch (dashboardView) {
      case DASHBOARD.SESSION:
        return <ProductSessionView />;
      case DASHBOARD.OVERVIEW:
        return <h2>overview</h2>;
    }
  }, [dashboardView]);

  React.useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = products.find(
        (product) => product._id === selectedProductId
      );
      if (selectedProduct) {
        dispatch(
          fetchSessionListAction(selectedProductId, { start: 0, size: 100 })
        );
      }
    }
  }, [selectedProductId]);

  return (
    <div>
      <ProductList products={products} selectedProductId={selectedProductId} />
      <div>
        <button onClick={() => setDashboardView(DASHBOARD.OVERVIEW)}>
          Overview
        </button>
        <button onClick={() => setDashboardView(DASHBOARD.SESSION)}>
          Session
        </button>
      </div>
      <div className="block-flow">{viewMemo}</div>
    </div>
  );
};
