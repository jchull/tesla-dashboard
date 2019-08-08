import React from 'react';
import './Product.css';
import {IVehicle} from '../../type/Vehicle';

interface ProductListItemState {
    product: IVehicle;
    handleSelection: (product: IVehicle) => void;
    selected?: boolean;
}

export const ProductListItem: React.SFC<ProductListItemState> = (props: ProductListItemState) => {
    let style = {color: props.product.color, boxShadow: 'none'};
    if(props.selected){
        style.boxShadow = '3px 2px 2px #000';
    }

    return (
        <button className="product"
            onClick={() => props.handleSelection(props.product)}
            style={style}>
        <h3> {props.product.display_name} </h3>
        </button>
    );
};

