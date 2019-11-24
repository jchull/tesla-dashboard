import React from 'react';
import {SessionList} from '@component/session';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSessionDetailsAction, fetchSessionListAction, selectSession} from '@component/session/actions';
import {AppState} from '@store/store';
import {ProductList} from '@component/product';
import {LineChart} from '@component/chart/LineChart';


export const ProductSessionView: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((store: AppState) => store.product.products);
  const sessions = useSelector((store: AppState) => store.session.sessions);
  const selectedProductId = useSelector((store: AppState) => store.product.selectedProductId);
  const selectedSessionId = useSelector((store: AppState) => store.session.selectedSessionId);
  const selectedSessionStates = useSelector((store: AppState) => store.session.selectedSessionStates);

  React.useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = products.find((product => product._id === selectedProductId));
      if (selectedProduct) {
        dispatch(fetchSessionListAction(selectedProductId));
      }
    }
  }, [selectedProductId]);

  React.useEffect(() => {
    if (selectedSessionId) {
      const selectedSession = sessions.find((session => session._id === selectedSessionId));
      if (selectedSession) {
        dispatch(fetchSessionDetailsAction(selectedSessionId));
      }
    }
  }, [selectedSessionId]);


  return (
      <div>
        <ProductList products={products} selectedProductId={selectedProductId}/>
        <div>
          <SessionList sessions={sessions} selectedSessionId={selectedSessionId}/>
          {
            selectedSessionStates ?
            <LineChart datum={selectedSessionStates}/>
                                  :
            <span>No data selected</span>
          }

        </div>
      </div>
  );
};
