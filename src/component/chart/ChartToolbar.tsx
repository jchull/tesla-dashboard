import React from 'react';
import {IVehicle} from '../../type/Vehicle';
import './ChartToolbar.css';

interface ChartToolbarState {
  product?: IVehicle;
}

export const ChartToolbar: React.SFC<ChartToolbarState> = (props: ChartToolbarState) => {


  return (
      <div className="chart-toolbar">
        <i className="material-icons on">battery_charging_full</i>
        <i className="material-icons on">directions_car</i>
        <i className="material-icons off">date_range</i>
        <i className="material-icons off">update</i>
        <i className="material-icons off">label</i>

        <div className="end">
          <i className="material-icons off">system_update</i>
        </div>

      </div>
  );
};

