import { act, render } from '@testing-library/react';
import pretty          from 'pretty';
import React           from 'react';


import { SessionList } from './reducer';

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

