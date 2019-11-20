import React from 'react';
import './SessionList.scss';
import {SessionListItem} from './SessionListItem';
import {queryService} from '@service/Services';
import {isDriveSession} from '../../type/util';
import {LineChart} from '@component/chart/LineChart';
import {SessionTagList} from '@component/vehicle/SessionTagList';
import {IVehicleSession, IVehicleState} from 'tesla-dashboard-api';
import {SessionListState} from '@store/types/state';
import {ChartToolbar} from '@component/chart/ChartToolbar';


export const SessionList: React.FC<SessionListState> = props => {
  const [selectedSession, setSelectedSession] = React.useState({} as IVehicleSession);
  const [selectedDatum, setSelectedDatum] = React.useState([] as IVehicleState[]);

  const sessionSelectionHandler = (session: IVehicleSession) => setSelectedSession(Object.assign({}, session));

  React.useEffect(() => {
    if (selectedSession._id && props.vehicle) {
      if (isDriveSession(selectedSession)) {
        queryService.getDrivingStates(props.vehicle.vin, selectedSession._id)
                    .then(setSelectedDatum);
      } else {
        queryService.getChargingStates(props.vehicle.vin, selectedSession._id)
                    .then(setSelectedDatum);
      }
    }

  }, [selectedSession]);

  return (
      <div className="session-list-container">
        <div className="session-list">
          {
            props.sessionList.map(session =>
                                      <SessionListItem session={session}
                                                       selected={session._id === selectedSession._id}
                                                       selectionHandler={() => sessionSelectionHandler(session)}
                                                       key={session._id}/>)
          }
        </div>
        {selectedSession && selectedDatum && selectedDatum.length > 0 && props.vehicle ?
         <div className="selected-view">
           <LineChart vehicle={props.vehicle}
                      session={selectedSession}
                      states={selectedDatum}/>
           <SessionTagList vehicleId={props.vehicle.vin}
                           sessionId={selectedSession._id}
                           tags={selectedSession.tags}/>
           <ChartToolbar product={props.vehicle} sessionId={selectedSession._id}/>

         </div>
                                                                                       :
         <div className="selected-view message">
           Nothing selected
         </div>
        }

      </div>
  );
};

