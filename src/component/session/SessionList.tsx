import React from 'react';
import './style.scss';
import {SessionListItem} from './SessionListItem';
import {isDriveSession} from '../../type/util';
import {LineChart} from '@component/chart/LineChart';
import {IVehicle, IVehicleSession, IVehicleState} from 'tesla-dashboard-api';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSessionListAction, selectSession, SessionState} from '@component/session/actions';
import {AppState} from '@store/store';


export const SessionList: React.FC<SessionState> = (props) => {

  const dispatch = useDispatch();
  const selectedSessionId = useSelector((store:AppState) => store.session.selectedSessionId);
  const [selectedDatum, setSelectedDatum] = React.useState([] as IVehicleState[]);

  const sessionSelectionHandler = (sessionId: string) => dispatch(selectSession(sessionId));



  React.useEffect(() => {
    if (props.sessions.length && !props.sessions.find((session) => session._id === selectedSessionId)) {
      // setSelectedSession(props.sessionList[0]);
    }
  }, [props.sessions]);

  return (
      <div className="session-list-container">
        <div className="session-list">
          {
            props.sessions.map(session =>
                                      <SessionListItem session={session}
                                                       selected={session._id === selectedSessionId}
                                                       selectionHandler={() => sessionSelectionHandler(session._id)}
                                                       key={session._id}/>)
          }
        </div>
        {selectedSessionId && selectedDatum && selectedDatum.length > 0 ?
         <div className="selected-view">
           {/*<LineChart vehicle={props.vehicle}*/}
           {/*           session={selectedSession}*/}
           {/*           states={selectedDatum}/>*/}
           {/*/!*<SessionTagList vehicleId={props.vehicle.vin}*!/*/}
           {/*                sessionId={selectedSessionId}*/}
           {/*                tags={selectedSession.tags}/>*/}
           {/*<ChartToolbar product={props.vehicle} sessionId={selectedSessionId}/>*/}

         </div>
                                                                                       :
         <div className="selected-view message">
           Nothing selected
         </div>
        }

      </div>
  );
};

