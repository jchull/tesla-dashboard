import React from 'react';
import { FilterToolbar } from '../toolbar/FilterToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';

interface FilterState {}

export const FilterPanel: React.FC<FilterState> = (props) => {
  const dispatch = useDispatch();
  const filters = useSelector((store: AppState) => store.session.filters);

  return (
    <div className="card">
      <h5>Filters</h5>
      <div></div>
      <FilterToolbar />
    </div>
  );
};
