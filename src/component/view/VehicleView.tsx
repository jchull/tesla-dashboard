import React from 'react';
import {QueryService} from '../../service/QueryService';
import {IVehicle} from '../../type/Vehicle';
import {IChargeSession} from '../../type/ChargeSession';
import {ChargeList} from '../list/ChargeList';
import {DriveList} from '../list/DriveList';
import {IDriveSession} from '../../type/DriveSession';

interface VehicleViewState {
  vehicle: IVehicle;
}


export const VehicleView: React.SFC<VehicleViewState> = (props) => {
  const queryService = new QueryService();
  const [chargeSessions, setChargeSessions] = React.useState([] as Array<IChargeSession>);
  const [driveSessions, setDriveSessions] = React.useState([] as Array<IDriveSession>);

  React.useEffect(() => {
    if (props.vehicle.id_s) {
      queryService.getRecentChargingSessions(props.vehicle.id_s, 8)
                  .then((result) => {
                    setChargeSessions(result);
                  });
      queryService.getRecentDrivingSessions(props.vehicle.id_s, 8)
                  .then((result) => {
                    setDriveSessions(result);
                  });
    }
  }, [props.vehicle]);


  return (
      <div>
        {chargeSessions && <ChargeList chargeSessions={chargeSessions}
                                       vehicle={props.vehicle}/>}
        {driveSessions && <DriveList driveSessions={driveSessions}
                                     vehicle={props.vehicle}/>}

      </div>
  );
};

