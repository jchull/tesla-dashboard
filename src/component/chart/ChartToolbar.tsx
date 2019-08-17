import React from 'react';
import {IVehicle} from '../../type/Vehicle';
import './ChartToolbar.css';

interface ChartToolbarState {
  product?: IVehicle;
}

export const ChartToolbar: React.SFC<ChartToolbarState> = (props: ChartToolbarState) => {


  return (
      <div className="chart-toolbar">
        <button className="on">
          <i className="material-icons">battery_charging_full</i>
        </button>
        <button className="on">
          <i className="material-icons">directions_car</i>
        </button>
        {/*<button className="off">*/}
        {/*  <i className="material-icons">date_range</i>*/}
        {/*</button>*/}
        {/*<button className="off">*/}
        {/*  <i className="material-icons">update</i>*/}
        {/*</button>*/}
        {/*<button className="off">*/}
        {/*  <i className="material-icons">label</i>*/}
        {/*</button>*/}
        {/*<div className="end">*/}
        {/*  <button className="off">*/}
        {/*    <i className="material-icons">system_update</i>*/}
        {/*  </button>*/}
        {/*</div>*/}

      </div>
  );
};

