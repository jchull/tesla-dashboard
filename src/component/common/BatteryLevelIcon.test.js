import React                from 'react';
import ReactDOM             from 'react-dom';
import { BatteryLevelIcon } from './BatteryLevelIcon';

it('renders empty battery', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BatteryLevelIcon battery_level={0}
                                    battery_range={0}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
