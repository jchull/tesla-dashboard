import React                      from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import pretty                     from 'pretty';


import { ProductList } from './ProductList';

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


it('renders empty product list', () => {
    act(() => {
        wrapper = render(<ProductList products={[]}/>);
    });
    expect(pretty(wrapper.container.innerHTML))
        .toMatchSnapshot();
});

