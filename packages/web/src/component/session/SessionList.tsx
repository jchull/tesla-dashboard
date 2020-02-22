import React from 'react';
import './session.style.scss';

import { useDispatch } from 'react-redux';

import { SessionListItem } from './SessionListItem';
import { selectSession, SessionState } from './actions';
import { FilterToolbar } from '@teslapp/web/src/component/toolbar/FilterToolbar';

export const SessionList: React.FC<SessionState> = (props: SessionState) => {
  const dispatch = useDispatch();

  return (
    <div className="session-list">
      <div className="sessions">
        {// @ts-ignore
        props.sessions &&
          props.sessions.map((session) => (
            <SessionListItem
              session={session}
              selected={session._id === props.selectedSessionId}
              selectionHandler={() => dispatch(selectSession(session._id))}
              key={session._id}
            />
          ))}
      </div>
      <FilterToolbar />
    </div>
  );
};
