import { act, render }      from '@testing-library/react';
import pretty               from 'pretty';
import React                from 'react';
import { BatteryLevelIcon } from './BatteryLevelIcon';

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


it('renders empty battery', () => {
  let batteryLevel = 0;
  act(() => {
    wrapper = render(<BatteryLevelIcon battery_level={batteryLevel}
                                       width={100}/>);
  });
  expect(pretty(wrapper.container.innerHTML))
    .toMatchSnapshot();
});

it('renders low battery', () => {
  let batteryLevel = 10;

  act(() => {
    wrapper = render(<BatteryLevelIcon battery_level={batteryLevel}
                                       width={100}/>);
  });
  expect(pretty(wrapper.getByLabelText('Battery Level').innerHTML))
    .toMatchSnapshot();
});

it('renders normal battery', () => {
  act(() => {
    wrapper = render(<BatteryLevelIcon battery_level={50}
                                       width={100}/>);
  });
  expect(pretty(wrapper.getByLabelText('Battery Level').innerHTML))
    .toMatchSnapshot();
});

it('renders high battery', () => {
  act(() => {
    wrapper = render(<BatteryLevelIcon battery_level={99}
                                       width={100}/>);
  });
  expect(pretty(wrapper.getByLabelText('Battery Level').innerHTML))
    .toMatchSnapshot();
});

