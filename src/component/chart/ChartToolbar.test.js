import React            from 'react';
import ReactDOM         from 'react-dom';
import { ChartToolbar } from './ChartToolbar';

it('renders default chart toolbar', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChartToolbar/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
