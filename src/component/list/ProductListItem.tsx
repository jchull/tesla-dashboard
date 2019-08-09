import React from 'react';
import './Product.css';
import {IVehicle} from '../../type/Vehicle';
import './ProductListItem.css';
import numbro from 'numbro';

interface ProductListItemState {
    product: IVehicle;
    handleSelection: (product: IVehicle) => void;
    selected?: boolean;
}

export const ProductListItem: React.SFC<ProductListItemState> = (props: ProductListItemState) => {
    return (
        <div className="product list card"
             onClick={() => props.handleSelection(props.product)}>
            <div className="row">
                <div className="name">{props.product.display_name}</div>
              <div className="status">{props.product.state}</div>
            </div>
            <div className="row">
              <div className="odometer">{numbro(props.product.odometer).format('0,0.00')} miles</div>
              <div className="battery_level">{props.product.battery_level}%</div>

            </div>

        </div>
    );
};

