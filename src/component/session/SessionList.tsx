import React from 'react';
import {useDispatch} from 'react-redux';

import {SessionListItem} from './SessionListItem';
import {selectSession, SessionState} from './actions';
import './style.scss';
import {ChargeSession, DriveSession} from 'tesla-dashboard-api';


export const SessionList: React.FC<SessionState> = (props: SessionState) => {

  const dispatch = useDispatch();

  return (
      <div className="session-list">
        {
          // @ts-ignore
          props.sessions && props.sessions.map(session =>
                                 <SessionListItem session={session}
                                                  selected={session._id === props.selectedSessionId}
                                                  selectionHandler={() => dispatch(selectSession(session._id))}
                                                  key={session._id}/>)
        }
      </div>
  );
};

