import React from 'react';
import { SessionList } from '@component/session';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSessionDetailsAction,
  fetchSessionListAction
} from '@component/session/actions';
import { AppState } from '@store/store';
import { ProductList } from '@component/product';
import { LineChart } from '@component/chart/LineChart';
import { SessionTagList } from '@component/vehicle/SessionTagList';
import { SessionToolbar } from '@component/toolbar/SessionToolbar';
import { createSelector } from '@reduxjs/toolkit';

export const ProductSessionView: React.FC = () => {
  const dispatch = useDispatch();

  const productsSelector = (store: AppState) => store.product.products;
  const selectedProductIdSelector = (store: AppState) =>
    store.product.selectedProductId;
  const products = useSelector(productsSelector);
  const selectedProductId = useSelector(selectedProductIdSelector);

  const sessionsSelector = (store: AppState) => store.session.sessions;
  const selectedSessionIdSelector = (store: AppState) =>
    store.session.selectedSessionId;
  const sessions = useSelector(sessionsSelector);

  // const tagsSelector = createSelector([sessionsSelector, sessionIdSelector],
  //                                     (sessions, selectedSessionId) => {
  //                                       const session = sessions.find(session => session._id === selectedSessionId);
  //                                       return tagsToDisplay(session && session.tags ? session.tags : []);
  //                                     }
  // );

  const selectedSessionId = useSelector(selectedSessionIdSelector);
  const selectedSessionStates = useSelector(
    (store: AppState) => store.session.selectedSessionStates
  );

  React.useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = products.find(
        (product) => product._id === selectedProductId
      );
      if (selectedProduct) {
        dispatch(fetchSessionListAction(selectedProductId));
      }
    }
  }, [selectedProductId]);

  React.useEffect(() => {
    if (selectedSessionId) {
      const selectedSession = sessions.find(
        (session) => session._id === selectedSessionId
      );
      if (selectedSession) {
        dispatch(fetchSessionDetailsAction(selectedSessionId));
      }
    }
  }, [selectedSessionId]);

  return (
    <div>
      <ProductList products={products} selectedProductId={selectedProductId} />
      <div className="block-flow">
        <SessionList
          sessions={sessions}
          selectedSessionId={selectedSessionId}
        />
        {selectedSessionStates && selectedSessionId ? (
          <div className="vertical-flex">
            <LineChart datum={selectedSessionStates} />
            <SessionTagList />
            <SessionToolbar sessionId={selectedSessionId} />
          </div>
        ) : (
          <span>No data selected</span>
        )}
      </div>
    </div>
  );
};
