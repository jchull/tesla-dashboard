import { act, render } from '@testing-library/react';
import React           from 'react';

import { App } from './App';

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


it('renders without crashing', () => {
  act(() => {
    wrapper = render(<App products={[]}/>);
  });

});
