import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

interface StatsState {}

export const StatsPanel: React.FC<StatsState> = (props) => {
  const selectedSessionId = useSelector(
    (store: AppState) => store.session.selectedSessionId
  );

  const loadedCount = useSelector(
    (store: AppState) => store.session.loadedCount
  );
  const totalCount = useSelector((store: AppState) => store.session.totalCount);
  const loading = useSelector((store: AppState) => store.session.loading);

  return (
    <div className="card">
      <h5>Stats</h5>
      <div>Selected Session: {selectedSessionId || '-'}</div>
      <div>
        Showing {loadedCount} of {totalCount}
      </div>
      {loading && <div>loading...</div>}
    </div>
  );
};
