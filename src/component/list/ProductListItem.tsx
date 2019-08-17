import React from 'react';
import {IVehicle} from '../../type/Vehicle';
import './ProductListItem.css';
import numbro from 'numbro';

interface ProductListItemState {
  product: IVehicle;
  handleSelection: (product: IVehicle) => void;
  selected?: boolean;
}

export const ProductListItem: React.SFC<ProductListItemState> = (props: ProductListItemState) => {

  let icon = 'local_parking';
  if(props.product.state === 'Charging'){
      icon = 'battery_charging_full';
  } else if(props.product.state === 'Driving'){
    icon = 'directions_car';
  }
  return (
      <div className="list-item product red_pinwheel18"
           onClick={() => props.handleSelection(props.product)}>
        <div className="row">
          <h2 className="name">{props.product.display_name}</h2>
          <div className="battery_level end">
            {props.product.battery_level}%
            <i className="material-icons charging">
              battery_charging_full
            </i>
            {numbro(props.product.battery_range)
                .format('0,0.00')} mi
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

