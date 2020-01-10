import React from 'react';
import moment from 'moment';
import {isDriveSession, isoDurationToHuman} from '../../type/util';
import {ChargeListItem} from './ChargeListItem';
import {DriveListItem} from './DriveListItem';
import {ChargeSession, DriveSession} from '@model/index';
import {SessionListItemState} from '@store/types/state';


export const SessionListItem: React.FC<SessionListItemState> = (props: SessionListItemState) => {

  const displayDate = moment(props.session.start_date)
      .calendar();

  const sessionType = isDriveSession(props.session) ? 'Drive' : 'Charge';

  const duration = moment.duration(moment(props.session.end_date)
                                       .diff(moment(props.session.start_date)));
  const displayDuration = isoDurationToHuman(duration.toISOString());

  let color = '#3f6ae1';
  if (!isDriveSession(props.session)) {
    color = (props.session as ChargeSession).fast_charger_present ? '#E31937' : '#00dc31';
  }
  const iconStyle = {color};

  return (
      <div
          className={props.selected ? `${sessionType.toLowerCase()} list-item selected` : `list-item ${sessionType.toLowerCase()} `}
          onClick={() => props.selectionHandler(props.session._id)}>
        <div className="row">
          <i className="material-icons"
             style={iconStyle}>{sessionType === 'Drive' ? 'directions_car' : 'battery_charging_full'}</i>
          <div className="start">{displayDate}</div>
          <div className="end">
            {displayDuration}
          </div>
        </div>
        {sessionType === 'Drive' ?
         <DriveListItem session={props.session as DriveSession}/>
                                 :
         <ChargeListItem session={props.session as ChargeSession}/>
        }

      </div>
  );
};
