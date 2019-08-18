import React from 'react';
import './SessionListItem.css';
import {IVehicleSession} from '../../type/VehicleSession';
import moment from 'moment';
import {isDriveSession, isoDurationToHuman} from '../../type/util';
import {ChargeListItem} from './ChargeListItem';
import {IChargeSession} from '../../type/ChargeSession';
import {DriveListItem} from './DriveListItem';
import {IDriveSession} from '../../type/DriveSession';

interface SessionListItemState {
  session: IVehicleSession;
  selected: boolean;
  selectionHandler: Function;
}

export const SessionListItem: React.SFC<SessionListItemState> = (props: SessionListItemState) => {

  const displayDate = moment(props.session.start_date)
      .calendar();

  const sessionType = isDriveSession(props.session) ? 'Drive' : 'Charge';

  const duration = moment.duration(moment(props.session.end_date)
      .diff(moment(props.session.start_date)));
  const displayDuration = isoDurationToHuman(duration.toISOString());

  return (
      <div className={props.selected ? `${sessionType.toLowerCase()} list-item selected` : `list-item ${sessionType.toLowerCase()} `}
           onClick={() => props.selectionHandler(props.session)}>
        <div className="row">
          <i className="material-icons">{sessionType === 'Drive' ? 'directions_car' : 'battery_charging_full'}</i>
          <div className="start">{displayDate}</div>
          <div className="end">
            {displayDuration}
          </div>
        </div>
        {sessionType === 'Drive' ?
            <DriveListItem session={props.session as IDriveSession}/>
            :
            <ChargeListItem session={props.session as IChargeSession}/>
        }

      </div>
  );
};

