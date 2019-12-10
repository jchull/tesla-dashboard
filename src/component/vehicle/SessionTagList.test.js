import { act, render } from '@testing-library/react';
import pretty          from 'pretty';
import React           from 'react';


import { SessionTagList } from './SessionTagList';

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


it('renders empty tag list', () => {
  act(() => {
    wrapper = render(<SessionTagList/>);
  });
  expect(pretty(wrapper.container.innerHTML))
    .toMatchSnapshot();
});

