import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Vehicle } from '@tesla-dashboard/types';

import { ProductListItem } from './ProductListItem';
import { fetchProductListAction, ProductState, selectProduct } from './actions';

import './product.style.scss';
import { NavLink } from 'react-router-dom';

export const ProductList: React.FC<ProductState> = (props: ProductState) => {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  React.useEffect(() => {
    dispatch(fetchProductListAction());
  }, []);

  return (
    <div className={`product-list ${collapsed ? 'collapsed' : ''}`}>
      {props.products.map((product: Vehicle) => (
        <ProductListItem
          product={product}
          key={product._id}
          handleSelection={() => dispatch(selectProduct(product._id))}
          selected={props.selectedProductId === product._id}
        />
      ))}
      <NavLink to="/tesla-account" className="add-more">
        add more linked accounts
      </NavLink>
      <button className="toggle" onClick={() => setCollapsed(!collapsed)} />
    </div>
  );
};
