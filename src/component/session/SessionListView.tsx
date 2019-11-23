import React from 'react';
import {SessionList} from '@component/session/index';
import {AppState} from '@store/types/state';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSessionListAction} from '@component/session/actions';
import {IVehicle} from 'tesla-dashboard-api';


export const SessionListView: React.FC = () => {

  const sessionListState = useSelector((store: AppState) => store.sessionList);
  const selectedProductId = useSelector((store:AppState) => store.productList.selectedProductId);
  const productList: IVehicle[] = useSelector((store:AppState) => store.productList.products);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = productList.find((product => product._id === selectedProductId));
      if(selectedProduct){
        dispatch(fetchSessionListAction(selectedProduct.vin));
      }
    }
  }, [selectedProductId]);


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

