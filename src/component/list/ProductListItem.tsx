import React from 'react';
import {ProductType} from '../../type/ProductType';
import './Product.css';

type ProductListItemState = {
  product: ProductType,
  handleSelection: (product: ProductType) => void,
  selected?: boolean
}

export const ProductListItem: React.SFC<ProductListItemState> = (state: ProductListItemState) => {
  let style = {color: state.product.color, boxShadow: 'none'};
  if(state.selected){
    style.boxShadow = '3px 2px 2px #000';
  }

  return (
      <button className="product"
              onClick={() => state.handleSelection(state.product)}
              style={style}>
        Product: <span> {state.product.name} </span>
      </button>
  );
};

