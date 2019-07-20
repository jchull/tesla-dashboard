import React from 'react';
import {ProductType} from '../../type/ProductType';
import {ChargeChart} from '../chart/ChargeChart';
import {QueryService} from '../../service/es/QueryService';
import {ChargeDatum} from '../../type/Datum';

interface ProductViewState {
  product: ProductType
}


export const ProductView: React.SFC<ProductViewState> = (state) => {
  const queryService = new QueryService();
  const [chargeSessions, setChargeSessions] = React.useState([] as ChargeDatum[]);

  React.useEffect(() => {
    queryService.getLastChargingSession(state.product.id)
        .then((result) => {
          setChargeSessions(result);
        });
  }, [state.product]);


  return (
      <div>
        <span>{state.product && state.product.name}</span>
        {state.product && state.product.type === 'CAR' ?
            <ChargeChart product={state.product}
                         data={chargeSessions}/>
            : <div>No Charging Data</div>}
      </div>
  );
};

