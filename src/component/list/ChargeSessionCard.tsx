import React from 'react';
import {IChargeSession} from '../../type/ChargeSession';
import './ChargeSessionCard.css';
import numbro from 'numbro';

interface ChargeSessionCardState {
  chargeSession: IChargeSession;
  selected: string;
}

export const ChargeSessionCard: React.SFC<ChargeSessionCardState> = (props: ChargeSessionCardState) => {


  return (
      <div className={props.selected === props.chargeSession._id ? 'charge card selected' : 'charge card'}>
        {new Date(props.chargeSession.start_date).toLocaleString()}
        <div>
          {numbro((props.chargeSession.end_date - props.chargeSession.start_date) / (60 * 1000))
              .format('1.0')} minutes
        </div>
        <div>
          {numbro(props.chargeSession.last.est_battery_range - props.chargeSession.first.est_battery_range)
              .format('0,2')} miles added
        </div>
        <div>
          {props.chargeSession.last._id !== props.chargeSession.first._id ? props.chargeSession.last.charge_energy_added : 0} kWh
          {numbro(props.chargeSession.last.charge_energy_added * 1.10 * 0.11).formatCurrency()}
        </div>
      </div>
  );
};

