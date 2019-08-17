import React from 'react';
import {IVehicle} from '../../type/Vehicle';
import './ProductListItem.css';
import numbro from 'numbro';
import {BatteryLevelIcon} from '../common/BatteryLevelIcon';

interface ProductListItemState {
  product: IVehicle;
  handleSelection: (product: IVehicle) => void;
  selected?: boolean;
}

export const ProductListItem: React.SFC<ProductListItemState> = (props: ProductListItemState) => {

  let icon = 'local_parking';
  if (props.product.state === 'Charging') {
    icon = 'battery_charging_full';
  } else if (props.product.state === 'Driving') {
    icon = 'directions_car';
  }
  return (
      <div className="list-item product red_pinwheel18"
           onClick={() => props.handleSelection(props.product)}>
        <div className="row">
          <h2 className="name">{props.product.display_name}</h2>
          <div className="battery_level end">
            <span>            {props.product.battery_level}%</span>
            <BatteryLevelIcon battery_level={props.product.battery_level}
                              battery_range={props.product.battery_range}
                              charging_state={props.product.charging_state}/>
            <span>{numbro(props.product.battery_range)
                .format('0,0.0')} mi</span>
          </div>
        </div>
        <div className="row">
          <div className="odometer start">{numbro(props.product.odometer)
              .format('0,0.00')} miles
          </div>


        </div>

      </div>
  );
};

