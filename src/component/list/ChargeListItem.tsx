import React from 'react';
import './SessionListItem.scss';
import moment from 'moment';
import numbro from 'numbro';
import { IChargeSession } from 'tesla-dashboard-api';

interface ChargeListItemState {
    session: IChargeSession;
}

export const ChargeListItem: React.FC<ChargeListItemState> = (props: ChargeListItemState) => {

    const durationMinutes = moment.duration(moment(props.session.end_date)
        .diff(moment(props.session.start_date)))
        .asMinutes();
    const last = props.session.last || props.session.first;
    const rangeAdded = last.charge_miles_added_rated;
    const avgChargingSpeed = rangeAdded / durationMinutes * 60;
    let costPerKwh = 0.12; // 11 cents home charging cost plus 10% loss ~12 cents
    if (props.session.fast_charger_brand === 'Tesla') {
        costPerKwh = 0.28; // 28 cents for superchargers charged by kWh added to battery?
    }
    const estChargingCost = last.charge_energy_added * costPerKwh;

    const estBatteryRange = last.est_battery_range;


    return (
        <div>
            <div className="row">
                <div className="start">
                    <span>{last._id !== props.session.first._id ? last.charge_energy_added : 0} kWh</span>
                </div>
                <span>{last._id !== props.session.first._id ? last.charge_miles_added_rated : 0} miles</span>
                <div className="end">

                    {numbro(estChargingCost)
                        .formatCurrency({mantissa: 2})}
                </div>
            </div>
            {durationMinutes > 3 &&
        <div className="row">
            <div className="start">
                {numbro(avgChargingSpeed)
                    .format('0,0.2')} mph avg charging speed
            </div>
        </div>
            }
        </div>
    );
};
