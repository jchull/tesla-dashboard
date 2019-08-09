import React from 'react';
import {IDriveSession} from '../../type/DriveSession';
import './DriveSessionCard.css';
import numbro from 'numbro';

interface DriveSessionCardState {
  driveSession: IDriveSession;
}

export const DriveSessionCard: React.SFC<DriveSessionCardState> = (props: DriveSessionCardState) => {


  return (
      <div className="drive card">
        {new Date(props.driveSession.start_date).toLocaleString()}
        <div>
          {numbro((props.driveSession.end_date - props.driveSession.start_date) / (60 * 1000))
            .format('1.0')} minutes
        </div>
        <div>
          {numbro(props.driveSession.last.est_battery_range - props.driveSession.first.est_battery_range)
              .format('0,2')} miles used
        </div>
        <div>
          {numbro(props.driveSession.last._id !== props.driveSession.first._id ? props.driveSession.last.odometer - props.driveSession.first.odometer : 0)
              .format('0.2')} miles traveled
        </div>
      </div>
  );
};

