import React    from 'react';

import { App } from './App';


import { act, render }      from '@testing-library/react';

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
