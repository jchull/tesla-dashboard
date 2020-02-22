import React from 'react';
import './toolbar.style.scss';
import { useDispatch } from 'react-redux';
import { removeSessionAction } from '@teslapp/web/src/component/session/actions';

interface FilterToolbarState {
  sessionId?: string;
}

export const FilterToolbar: React.FC<FilterToolbarState> = (
  props: FilterToolbarState
) => {
  const dispatch = useDispatch();
  //
  // async function deleteCurrent() {
  //   const _id = props.sessionId;
  //
  //   if(_id){
  //     dispatch(removeSessionAction(_id));
  //   }
  //
  // }

  return (
    <div className="toolbar">
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
