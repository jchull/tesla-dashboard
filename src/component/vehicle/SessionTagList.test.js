import React                              from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act }                            from 'react-dom/test-utils';
import { SessionTagList }                 from './SessionTagList';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it('renders empty tag list', () => {
  act(() => {
    render(<SessionTagList tags={[]}
                           sessionId="xyz1"
                           vehicleId="abc1"/>, container);
  });
  // expect(container.innerHTML)
  //   .toMatchInlineSnapshot();
});

