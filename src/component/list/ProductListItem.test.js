import React                              from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act }                            from 'react-dom/test-utils';
import { ProductListItem }                from './ProductListItem';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it('renders product list item', () => {
  const product = {
    '_id': 'aaaaaaaaa',
    'vin': 'abc',
    'display_name': 'Display Name',
    'option_codes': '',
    'color': 'RedMulticoat',
    'state': 'Driving',
    'id_s': '123456789',
    'calendar_enabled': true,
    'api_version': 6,
    'battery_level': 60,
    'car_type': 'model3',
    'odometer': 123.45,
    'timestamp': 1566408896502,
    'battery_range': 182.91,
    'charging_state': 'Disconnected',
    'time_to_full_charge': 0,
    'charge_limit_soc': 83,
    'charge_limit_soc_min': 50,
    'last_session_id': 'aadzfsfdsfa'
  };
  const handler = (selectedProduct) => console.log(selectedProduct.display_name);

  act(() => {
    render(<ProductListItem selected={false}
                            product={product}
                            handleSelection={handler}/>, container);
  });
  // expect(container.innerHTML)
  //   .toMatchInlineSnapshot();
});
