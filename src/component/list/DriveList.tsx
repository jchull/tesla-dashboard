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

  React.useEffect(() => {
    setDriveSessions(props.driveSessions);
  }, [props.driveSessions]);

  return (
      <div className="drive-list-container">
        <h4>Driving</h4>
        <div className="drive-list">
          {
            driveSessions && driveSessions.map(driveSession =>
                <div key={driveSession._id}
                     onClick={() => driveSelectionHandler(driveSession)}>
                  <DriveSessionCard driveSession={driveSession} selected={selectedSession._id}/>
                </div>)
          }

        </div>
        {
          driveStates && selectedSession._id ?
              <div className="drive-chart-container">
                <DriveChart vehicle={props.vehicle}
                            session={selectedSession}
                            states={driveStates}/>
              </div>
              : <div></div>}
      </div>

      //
      // <ul>
      //   {driveStates && props.driveSessions.map(driveSession =>
      //       <li key={driveSession._id}
      //           onClick={() => driveSelectionHandler(driveSession)}>
      //         <DriveSessionCard driveSession={driveSession}
      //                           key={driveSession._id}
      //         />
      //       </li>)}
      //
      //   {driveStates && selectedSession._id ?
      //       <DriveChart vehicle={props.vehicle}
      //                   session={selectedSession}
      //                   states={driveStates}/>
      //       : <div></div>}
      //
      // </ul>
  );
};

