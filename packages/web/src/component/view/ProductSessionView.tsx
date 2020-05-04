import React from 'react';
import { SessionList } from '@teslapp/web/src/component/session';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSessionDetailsAction,
  fetchSessionListAction
} from '@teslapp/web/src/component/session/actions';
import { AppState } from '@teslapp/web/src/store';
import { LineChart } from '@teslapp/web/src/component/chart/LineChart';
import { SessionTagList } from '@teslapp/web/src/component/vehicle/SessionTagList';
import { StatsPanel } from '../stats/StatsPanel';
import { FilterPanel } from '../filter/FilterPanel';
import { CommandPanel } from '../command/CommandPanel';

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
        dispatch(
          fetchSessionListAction(selectedProductId, { start: 0, size: 100 })
        );
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
    <>
      <div className="block-flow">
        <SessionList
          sessions={sessions}
          selectedSessionId={selectedSessionId}
        />
        <div className="vertical-flex">
          <LineChart datum={selectedSessionStates} />
          <SessionTagList />
          <CommandPanel />
        </div>
        <div className="vertical-flex stretch">
          <StatsPanel />
          <FilterPanel />
        </div>
      </div>
    </>
  );
};
