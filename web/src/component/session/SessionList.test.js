import { act, render } from '@testing-library/react';
import pretty          from 'pretty';
import React           from 'react';
import {SessionList} from "@component/session/SessionList";
import {getMockProvider} from "../../__mocks__/ReduxMockWrapper";

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
  const {ReduxMockWrapper} = getMockProvider({auth: {loggedIn: false}});

  act(() => {
    wrapper = render(<ReduxMockWrapper><SessionList/></ReduxMockWrapper>);
  });
  expect(pretty(wrapper.container.innerHTML))
    .toMatchSnapshot();
});

