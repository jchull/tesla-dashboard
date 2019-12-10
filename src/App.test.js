import {act, render} from '@testing-library/react';
import React from 'react';

import {App} from './App';
import {getMockProvider} from "./__mocks__/ReduxMockWrapper";

let wrapper;
describe('App root', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    if (wrapper) {
      if (wrapper.unmount) {
        wrapper.unmount();
      }
      if (wrapper.container) {
        wrapper.container = null;
      }
    }
  });


  it('renders without crashing', () => {
    const {ReduxMockWrapper} = getMockProvider({auth: {loggedIn: false}});

    act(() => {
      wrapper = render(<ReduxMockWrapper><App/></ReduxMockWrapper>);
    });

  });
});