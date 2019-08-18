import React from 'react';
import {IVehicle} from '../../type/Vehicle';
import './ProductListItem.css';
import numbro from 'numbro';
import {BatteryLevelIcon} from '../common/BatteryLevelIcon';
import moment from 'moment';
import {isoDurationToHuman} from '../../type/util';

interface ProductListItemState {
  product: IVehicle;
  handleSelection: (product: IVehicle) => void;
  selected?: boolean;
}

export const ProductListItem: React.SFC<ProductListItemState> = (props: ProductListItemState) => {

  const timeToFull = isoDurationToHuman(moment.duration(props.product.time_to_full_charge || 0, 'hours').toISOString());
  return (
      <div className="list-item product red_pinwheel18"
           onClick={() => props.handleSelection(props.product)}>
        <div className="row">
          <h2 className="name">{props.product.display_name}</h2>
          <div className="battery_level end">
            <span>{props.product.battery_level}%</span>
            <BatteryLevelIcon battery_level={props.product.battery_level}
                              battery_range={props.product.battery_range}
                              charging_state={props.product.charging_state}
            charge_limit={90}/>
            <span>{numbro(props.product.battery_range)
                .format('0,0.0')} mi</span>
          </div>
        </div>
        <div className="row">
          <div className="odometer start">{numbro(props.product.odometer)
              .format('0,0.00')} miles
          </div>


        </div>

        <div className="row">
          <div className="status start">
            {
              props.product.charging_state === 'Charging' &&
              `${timeToFull} remaining`
            }
          </div>


        </div>

      </div>
  );
};

