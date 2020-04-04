import React from 'react';
import {FilterToolbar} from '../toolbar/FilterToolbar';

interface FilterState {

}

export const FilterPanel: React.FC<FilterState> = (props) => {

  return (
    <div className="card">
      <h5>Filters</h5>
      <div></div>
      <FilterToolbar />
    </div>
  );
};
