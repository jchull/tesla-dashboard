import React from 'react';
import {QueryService} from '../../service/QueryService';
import {SessionList} from '../list/SessionList';
import {ChartToolbar} from '../chart/ChartToolbar';
import { IVehicle, IVehicleSession } from 'tesla-dashboard-api';

interface VehicleViewState {
  vehicle: IVehicle;
}


export const VehicleView: React.FC<VehicleViewState> = (props) => {
  const queryService = new QueryService();
  const [sessions, setSessions] = React.useState([] as Array<IVehicleSession>);

  React.useEffect(() => {
    if (props.vehicle.id_s) {
      queryService.getRecentSessions(props.vehicle.id_s, 100)
                  .then((result) => {
                    setSessions(result);
                  });
    }
  }, [props.vehicle]);


  return (
      <div>
        {sessions && <div>
          <SessionList sessions={sessions}
                       vehicle={props.vehicle}/>
          <ChartToolbar/>
        </div>
        }
      </div>
  );
};

