import React                              from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import { TagList } from './TagList';

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
    render(<TagList tags={[]}
                    addListener={console.log}
                    removeListener={console.log}/>, container);
  });
  // expect(container.innerHTML)
  //   .toMatchInlineSnapshot();
});

it('renders simple tag list', () => {
  act(() => {
    render(<TagList tags={['item_1', 'item_2']}
                    addListener={console.log}
                    removeListener={console.log}/>, container);
  });
  // expect(container.innerHTML)
  //   .toMatchInlineSnapshot();
});
