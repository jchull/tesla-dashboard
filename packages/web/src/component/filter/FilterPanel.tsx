import React from 'react';
import {FilterToolbar} from '../toolbar/FilterToolbar';

interface FilterState {

}

export const FilterPanel: React.FC<FilterState> = (props) => {

  return (
    <div className="card">
      filters
      <FilterToolbar />
    </div>
  );
};
