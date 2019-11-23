import React from 'react';
import {SessionList} from '@component/session/index';
import {IVehicle} from 'tesla-dashboard-api';
import {AppState} from '@store/types/state';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSessionListAction} from '@component/session/actions';


export interface VehicleViewProps {
  vehicle: IVehicle;
}

export const SessionListView: React.FC<VehicleViewProps> = (props) => {

  const sessionListState = useSelector((store: AppState) => store.sessionList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.vehicle.vin) {
      fetchSessionListAction(props.vehicle.vin);
    }
  }, [props.vehicle]);


  return (
      <div>
        {sessionListState.sessionList && <div>
          <SessionList sessionList={sessionListState.sessionList}
                       vehicle={props.vehicle}/>
        </div>
        }
      </div>
  );
};

