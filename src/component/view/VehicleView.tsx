import React from 'react';
import {queryService} from '@service/Services';
import {SessionList} from '@component/list/SessionList';
import {IVehicle} from 'tesla-dashboard-api';
import {AppState} from '@store/types/state';
import {useDispatch, useSelector} from 'react-redux';
import {ACTION_TYPES} from '../../store/actions';


export interface VehicleViewProps {
  vehicle: IVehicle;
}

export const VehicleView: React.FC<VehicleViewProps> = (props) => {

  const sessionListState = useSelector((store: AppState) => store.sessionList);
  const dispatcher = useDispatch();

  React.useEffect(() => {
    if (props.vehicle.vin) {
      console.log('fetching recent sessions...');
      queryService.getRecentSessions(props.vehicle.vin, 200)
                  .then((result) => {
                    dispatcher({type: ACTION_TYPES.UPDATE_SESSION_LIST, sessionList: result});
                  });
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

