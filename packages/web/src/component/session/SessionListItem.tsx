import React from 'react'
import moment from 'moment'
import { isoDurationToHuman } from '../../type/util'
import { ChargeListItemDetail } from './ChargeListItemDetail'
import { DriveListItemDetail } from './DriveListItemDetail'
import { types } from '@teslapp/common'
import { SessionListItemState } from '@teslapp/web/src/store/types/state'

export const SessionListItem: React.FC<SessionListItemState> = (
  props: SessionListItemState
) => {
  const displayDate = moment(props.session.start_date)
    .calendar()

  const duration = moment.duration(
    moment(props.session.end_date)
      .diff(moment(props.session.start_date))
  )
  const displayDuration = isoDurationToHuman(duration.toISOString())

  let color = '#3f6ae1'
  if (props.session.activity !== types.ActivityType.DRIVING) {
    color = props.session.fast_charger_present
      ? '#E31937'
      : '#00dc31'
  }
  const iconStyle = { color }

  return (
    <div
      className={
        props.selected
          ? `${props.session.activity.toLowerCase()} list-item selected`
          : `list-item ${props.session.activity.toLowerCase()} `
      }
      onClick={() => props.selectionHandler(props.session._id)}
    >
      <div className="row">
        <i className="material-icons"
           style={iconStyle}>
          {props.session.activity === types.ActivityType.DRIVING ? 'directions_car' : 'battery_charging_full'}
        </i>
        <div className="start">{displayDate}</div>
        <div className="end">{displayDuration}</div>
      </div>
      {props.session.activity === types.ActivityType.DRIVING ? (
        <DriveListItemDetail {...props}/>
      ) : (
        <ChargeListItemDetail {...props}/>
      )}
    </div>
  )
}
