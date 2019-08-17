import React from 'react';
import {IVehicle} from '../../type/Vehicle';
import './SessionList.css';
import {IVehicleSession} from '../../type/VehicleSession';
import {SessionListItem} from './SessionListItem';
import {QueryService} from '../../service/QueryService';
import {isDriveSession} from '../../type/util';
import {IVehicleState} from '../../type/VehicleState';
import {LineChart} from '../chart/LineChart';

interface SessionListState {
  sessions: Array<IVehicleSession>,
  vehicle: IVehicle
}


export const SessionList: React.SFC<SessionListState> = (props: SessionListState) => {
  const [selectedSession, setSelectedSession] = React.useState({} as IVehicleSession);
  const [selectedDatum, setSelectedDatum] = React.useState([] as Array<IVehicleState>);

  const sessionSelectionHandler = (session: IVehicleSession) => setSelectedSession(Object.assign({}, session));
  const queryService = new QueryService();

  React.useEffect(() => {
    if (isDriveSession(selectedSession)) {
      queryService.getDrivingStates(props.vehicle.id_s, selectedSession._id)
                  .then((result) => {
                    setSelectedDatum(result);
                  });
    } else {
      queryService.getChargingStates(props.vehicle.id_s, selectedSession._id)
                  .then((result) => {
                    setSelectedDatum(result);

                  });
    }

  }, [selectedSession]);

  return (
      <div className="session-list-container">
        <div className="session-list">
          {
            props.sessions.map(session =>
                <SessionListItem session={session}
                                 selected={session._id === selectedSession._id}
                                 selectionHandler={() => sessionSelectionHandler(session)}
                                 key={session._id}/>)
          }
        </div>

        <div className="selected-view">
          {selectedSession && selectedDatum && selectedDatum.length && <LineChart vehicle={props.vehicle}
                                                                                  session={selectedSession}
                                                                                  states={selectedDatum}/>}

        </div>

      </div>
  );
};

