import React from 'react';
import {queryService} from '@service/Services';
import {SessionList} from '../list/SessionList';
import {ChartToolbar} from '../chart/ChartToolbar';
import {IVehicleSession} from 'tesla-dashboard-api';
import {VehicleViewState} from '../../type/state';

export const VehicleView: React.FC<VehicleViewState> = (props) => {
  const [sessions, setSessions] = React.useState([] as IVehicleSession[]);

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

