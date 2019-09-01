import React                      from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import pretty                     from 'pretty';


import { SessionList } from './SessionList';

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


it('renders empty session list', () => {
    act(() => {
        wrapper = render(<SessionList sessions={[]}/>);
    });
    expect(pretty(wrapper.container.innerHTML))
        .toMatchSnapshot();
});

