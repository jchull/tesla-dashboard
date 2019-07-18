import React from 'react';
import {ProductType} from '../../type/ProductType';
import {ChargeChart} from '../chart/ChargeChart';

interface ProductViewState {
  product?: ProductType
}

export const ProductView: React.SFC<ProductViewState> = (state) => {
  // const [product, setProduct] = React.useState(state.product);
  //
  // React.useEffect(() => {
  //   if (product) {
  //     console.log(`Viewing: ${product.name}`);
  //   }
  // }, [product]);


  return (
      <div>
        <span>{state.product && state.product.name}</span>
        {state.product && state.product.type === 'CAR'?
        <ChargeChart carName={state.product.name} data={[{d:101, date: new Date()}, {d:190, date: new Date( new Date().valueOf() - 100000)}]}/>
        :''}
      </div>
  );
};

