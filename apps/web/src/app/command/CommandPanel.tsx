import React from 'react';
import { SessionToolbar } from '../toolbar/SessionToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';

interface CommandState {}

export const CommandPanel: React.FC<CommandState> = (props) => {
  const dispatch = useDispatch();

  const selectedSessionIdSelector = (store: AppState) => store.session.selectedSessionId;
  const selectedSessionId = useSelector(selectedSessionIdSelector);

  return (
    <div className="card">
      <h5>Commands</h5>
      <SessionToolbar sessionId={selectedSessionId} />
    </div>
  );
};
