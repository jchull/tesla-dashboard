import React from 'react';
import {QueryService} from '../../service/QueryService';
import {IVehicle} from '../../type/Vehicle';
import {IChargeSession} from '../../type/ChargeSession';
import {ChargeList} from '../list/ChargeList';

interface VehicleViewState {
  vehicle: IVehicle;
}


export const VehicleView: React.SFC<VehicleViewState> = (props) => {
  const queryService = new QueryService();
  const [chargeSessions, setChargeSessions] = React.useState([] as Array<IChargeSession>);

  React.useEffect(() => {
    if (props.vehicle.id_s) {
      queryService.getRecentChargingSessions(props.vehicle.id_s, 10)
                  .then((result) => {
                      setChargeSessions(result);
                  });
    }
  }, [props.vehicle]);


  return (
      <div>
        <span>{props.vehicle && props.vehicle.display_name}</span>

          {chargeSessions && <ChargeList chargeSessions={chargeSessions} vehicle={props.vehicle}/>}

      </div>
  );
};

