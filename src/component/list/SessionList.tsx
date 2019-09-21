import React from 'react';
import './SessionList.scss';
import {SessionListItem} from './SessionListItem';
import {queryService} from '@service/Services';
import {isDriveSession} from '../../type/util';
import {LineChart} from '../chart/LineChart';
import {SessionTagList} from '../vehicle/SessionTagList';
import {IVehicleSession, IVehicleState} from 'tesla-dashboard-api';
import {SessionListState} from '../../type/state';


export const SessionList: React.FC<SessionListState> = props => {
  const [selectedSession, setSelectedSession] = React.useState({} as IVehicleSession);
  const [selectedDatum, setSelectedDatum] = React.useState([] as IVehicleState[]);

  const sessionSelectionHandler = (session: IVehicleSession) => setSelectedSession(Object.assign({}, session));

  React.useEffect(() => {
    if (selectedSession._id) {
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
        {selectedSession && selectedDatum && selectedDatum.length > 0 ?
            <div className="selected-view">
              <LineChart vehicle={props.vehicle}
                         session={selectedSession}
                         states={selectedDatum}/>
              <SessionTagList vehicleId={props.vehicle.id_s}
                              sessionId={selectedSession._id}
                              tags={selectedSession.tags}/>

            </div>
            :
            <div className="selected-view message">
              Nothing selected
            </div>
        }

      </div>
  );
};

