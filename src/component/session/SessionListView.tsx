import React from 'react';
import {SessionList} from '@component/session/index';
import {AppState} from '@store/types/state';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSessionListAction} from '@component/session/actions';


export const SessionListView: React.FC = () => {

  const sessionListState = useSelector((store: AppState) => store.sessionList);
  const product = useSelector((store:AppState) => store.productList.selectedProduct);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (product) {
      dispatch(fetchSessionListAction(product.vin));
    }
  }, [product]);


  return (
      <div>
        {sessionListState.sessionList && <div>
          <SessionList sessionList={sessionListState.sessionList}
                       vehicle={sessionListState.vehicle}/>
        </div>
        }
      </div>
  );
};

