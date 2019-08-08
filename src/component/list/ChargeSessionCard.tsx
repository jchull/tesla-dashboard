import React from 'react';
import {IChargeSession} from '../../type/ChargeSession';

interface ChargeSessionCardState {
  chargeSession: IChargeSession;
}

export const ChargeSessionCard: React.SFC<ChargeSessionCardState> = (props: ChargeSessionCardState) => {

  const startTime = Date.parse(''+props.chargeSession.start_date)
                               .valueOf();
    const endTime = Date.parse(''+props.chargeSession.end_date)
                          .valueOf();

  return (
      <div className="charge card">
        {props.chargeSession.start_date}
        <div>
            duration { (endTime - startTime) / (60 * 1000)} minutes
        </div>
      </div>
  );
};

