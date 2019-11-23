import React from 'react';
import './ChartToolbar.scss';
import {IVehicle} from 'tesla-dashboard-api';
import {useDispatch} from 'react-redux';

interface ToolbarState {
  product?: IVehicle;
  sessionId?: string;
}

// TODO: this is turning into a general toolbar when there is at least a product selected
export const ChartToolbar: React.FC<ToolbarState> = props => {

  const dispatch = useDispatch();

  async function deleteCurrent() {
    const _id = props.sessionId;

    if(_id){
      // dispatch({type: ACTION_TYPES.DELETE_SESSION__START, sessionId: _id});
    }

    // const vin = props.product && props.product.vin;
    // if (_id && vin) {
    //   const deleteCount = await queryService.removeSession(vin, _id);
    //   if (deleteCount) {
    //     console.log("deleted");
    //   } else {
    //     console.log("deletion error");
    //   }
    // } else {
    //   console.log("missing params");
    // }
  }

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

        <button className="warn"
                onClick={() => deleteCurrent()}>
          <i className="material-icons">delete</i>
        </button>
      </div>
  );
};

