import React from 'react';
import moment from 'moment';
import numbro from 'numbro';
import {DriveListItemState} from '@store/types/state';

export const DriveListItem: React.FC<DriveListItemState> = (props: DriveListItemState) => {

  const durationHours = moment.duration(moment(props.session.end_date)
      .diff(moment(props.session.start_date)))
                              .asHours();
  // const rangeUsed = props.session.first.battery_range - props.session.last.battery_range;

  const distanceTraveled = props.session.last ? props.session.last.odometer - props.session.first.odometer : 0;

  const averageSpeed = distanceTraveled / durationHours;

  // const energyUsed = 0;

  // const efficiencyGradeClassName = distanceTraveled - rangeUsed > 0 ? 'better' : 'worse';

  return (
      <div>
        {
          distanceTraveled > 0 ?
              <div>
                <div className="row">
                  <div className="start">
                                <span>
                                    {numbro(distanceTraveled)
                                        .format('0.0')} miles
                                </span>
                  </div>
                  <div className="end">
                    {numbro(averageSpeed)
                        .format('0,0.0')} mph
                  </div>
                </div>
                < div className="row">
                  <div className="start">
                    {/*<span className={efficiencyGradeClassName}>*/}
                    {/*  {numbro(rangeUsed)*/}
                    {/*      .format('0.0')}*/}
                    {/*</span>*/}
                    {/*<span>*/}
                    {/*  miles used*/}
                    {/*</span>*/}
                  </div>
                  <div className="end">
                    {/*{numbro(energyUsed)*/}
                    {/*    .format('0,0.0')} wh/mi*/}
                  </div>

                </div>
              </div>
              :
              < div className="row">


              </div>
        }
      </div>

  );
};
