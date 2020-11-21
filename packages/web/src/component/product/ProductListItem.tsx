import React from 'react'
import numbro from 'numbro'
import { BatteryLevelIcon } from '../common/BatteryLevelIcon'
import moment from 'moment'
import { ProductListItemState } from '@teslapp/web/src/store/types/state'

export const ProductListItem: React.FC<ProductListItemState> = (
  props: ProductListItemState
) => {
  const timeToFull = moment
    .duration(props.product.time_to_full_charge || 0, 'hours')
    .humanize()
  return (
    <div
      className="list-item product red_pinwheel18"
      onClick={() => props.handleSelection(props.product._id)}
    >
      <div className="row">
        <h2 className="name">{props.product.display_name}</h2>
        <div className="battery_level end">
          <span>{props.product.battery_level}%</span>
          <BatteryLevelIcon
            batteryLevel={props.product.battery_level}
            batteryRange={props.product.battery_range}
            chargingState={props.product.charging_state}
            chargeLimit={90}
            width={40}
          />
          <span>{numbro(props.product.battery_range)
            .format('0,0.0')} mi</span>
        </div>
      </div>
      <div className="row">
        <div className="odometer start">
          {numbro(props.product.odometer)
            .format('0,0.0')} miles
        </div>
      </div>

      <div className="row">
        <div className="status start">
          as of {moment(props.product.timestamp).fromNow()}
        </div>
       <div className="status end">
         {props.product.charging_state === 'Charging'
           ? `${timeToFull} remaining`
           : props.product.state}
        </div>

      </div>
    </div>
  )
}
