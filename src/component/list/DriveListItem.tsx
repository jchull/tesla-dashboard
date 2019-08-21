import React from 'react';
import './SessionListItem.css';
import moment from 'moment';
import {IDriveSession} from '../../type/DriveSession';
import numbro from 'numbro';

interface DriveListItemState {
  session: IDriveSession;
}

export const DriveListItem: React.FC<DriveListItemState> = (props: DriveListItemState) => {

  const durationHours = moment.duration(moment(props.session.end_date)
      .diff(moment(props.session.start_date)))
                              .asHours();
  // const rangeUsed = Math.max(0, props.session.last.ideal_battery_range - props.session.first.ideal_battery_range);

  const distanceTraveled = props.session.last.odometer - props.session.first.odometer;

  const averageSpeed = distanceTraveled / durationHours;


  return (
      <div>
        {
          distanceTraveled > 0 ?
              <div className="row">
                <div className="start">
            <span>{numbro(distanceTraveled)
                .format('0.0')} miles</span>
                </div>
                <div className="end">{numbro(averageSpeed)
                    .format('0,0.0')} mph
                </div>
              </div>
              :
              < div className="row">


              </div>
        }
      </div>

  );
};
