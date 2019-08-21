import React                              from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act }                            from 'react-dom/test-utils';
import { ProductList }                    from './ProductList';

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


it('renders empty product list', () => {
  act(() => {
    render(<ProductList products={[]}/>, container);
  });
  // expect(container.innerHTML)
  //   .toMatchInlineSnapshot();
});

