import React from 'react';
import './SessionListItem.css';
import {IVehicleSession} from '../../type/VehicleSession';
import moment from 'moment';
import {isDriveSession} from '../../type/util';

interface SessionListItemState {
  session: IVehicleSession;
  selected: boolean;
  selectionHandler: Function;
}

export const SessionListItem: React.SFC<SessionListItemState> = (props: SessionListItemState) => {

  const displayDate = moment(props.session.start_date)
      .calendar();

  const sessionType = isDriveSession(props.session) ? 'Drive' : 'Charge';

  // const rangeAdded = props.chargeSession.last.battery_range - props.chargeSession.first.battery_range;
  // const chargingDuration = (props.chargeSession.end_date - props.chargeSession.start_date) / 60000;
  // const avgChargingSpeed = rangeAdded / (chargingDuration / 60);
  // let costPerKwh = 0.11; // 11 cents home charging cost
  // if(props.chargeSession.fast_charger_brand === 'Tesla'){
  //   costPerKwh = 0.28; // 28 cents for superchargers
  // }
  // const estChargingCost = props.chargeSession.last.charge_energy_added * 1.10 * costPerKwh;
  //
  // const estBatteryRange = props.chargeSession.last.est_battery_range;
  //

  const sessionDetails = <div>{sessionType}</div>;


  return (
      <div className={props.selected ? `${sessionType.toLowerCase()} list-item selected` : `list-item ${sessionType.toLowerCase()} `}
           onClick={() => props.selectionHandler(props.session)}>
        <i className="material-icons">{sessionType === 'Drive' ? 'directions_car' : 'battery_std'}</i>
        {displayDate}

      </div>
  );
};
//
// <div>
//   {numbro(rangeAdded)
//       .format('0,2')}
//   <span className="smtxt">miles added in</span>
//   {numbro(chargingDuration)
//       .format('1.0')} minutes
// </div>
// <div>
//
// </div>
// <div>
// {props.chargeSession.last._id !== props.chargeSession.first._id ? props.chargeSession.last.charge_energy_added : 0} kWh
// <span className="smtxt">costing</span>
//     {numbro(estChargingCost)
//       .formatCurrency()}
// </div>
//
// <div>
// {numbro(avgChargingSpeed).format('0,0.2')} mph avg charging speed
// </div>
//
// <div>
// {props.chargeSession.last.battery_level > 80 ? `${numbro(estBatteryRange).format('0,0.2')} miles est max range` : 'no range estimate'}
// </div>
