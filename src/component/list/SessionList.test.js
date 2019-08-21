import React                              from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act }                            from 'react-dom/test-utils';
import { SessionList }                    from './SessionList';

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


it('renders empty session list', () => {
  act(() => {
    render(<SessionList sessions={[]}/>, container);
  });
  // expect(container.innerHTML)
  //   .toMatchInlineSnapshot();
});

