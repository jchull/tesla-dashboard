import React                      from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import pretty                     from 'pretty';


import { ProductListItem } from './ProductListItem';

let wrapper;

beforeEach(() => {
});

afterEach(() => {
    if(wrapper) {
        if(wrapper.unmount) {
            wrapper.unmount();
        }
        if(wrapper.container) {
            wrapper.container = null;
        }
    }
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
        wrapper = render(<ProductListItem selected={false}
            product={product}
            handleSelection={handler}/>);
    });
    expect(pretty(wrapper.container.innerHTML))
        .toMatchSnapshot();
});
