import React from 'react';
import {IDriveSession} from '../../type/DriveSession';
import {IVehicle} from '../../type/Vehicle';
import {IDriveState} from '../../type/DriveState';
import {QueryService} from '../../service/QueryService';
import './DriveList.css';
import {DriveSessionCard} from './DriveSessionCard';
import {DriveChart} from '../chart/DriveChart';

interface DriveListState {
  driveSessions: Array<IDriveSession>;
  vehicle: IVehicle;


}


export const DriveList: React.SFC<DriveListState> = (props: DriveListState) => {
  const queryService = new QueryService();

  const [driveSessions, setDriveSessions] = React.useState(props.driveSessions);
  const [selectedSession, setSelectedSession] = React.useState({} as IDriveSession);

  const [driveStates, setDriveStates] = React.useState([] as Array<IDriveState>);

  const driveSelectionHandler = (session: IDriveSession) => setSelectedSession(Object.assign({}, session));


  React.useEffect(() => {
    if (selectedSession._id && props.vehicle.id_s) {
      queryService.getDrivingStates(props.vehicle.id_s, selectedSession._id)
                  .then(drivingStates => {
                    setDriveStates(drivingStates);

                  });
    }
  }, [selectedSession, props.vehicle.id_s]);

  // TODO: move off props below
  return (
      <ul>
        {props.driveSessions && props.driveSessions.map(driveSession =>
            <li key={driveSession._id}
                onClick={() => driveSelectionHandler(driveSession)}>
              <DriveSessionCard driveSession={driveSession}
                                key={driveSession._id}
              />
            </li>)}

        {driveStates && selectedSession._id ?
            <DriveChart vehicle={props.vehicle}
                        session={selectedSession}
                        states={driveStates}/>
            : <div></div>}

      </ul>
  );
};

