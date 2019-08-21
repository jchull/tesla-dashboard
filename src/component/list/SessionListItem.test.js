import React                              from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act }                            from 'react-dom/test-utils';
import { SessionListItem }                from './SessionListItem';

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


it('renders session list item', () => {
  const session = {
    _id: 'test1',
    first: {
      odometer: 75
    },
    last: {
      odometer: 100
    }
  };

  const handler = (session) => console.log(session._id);

  act(() => {
    render(<SessionListItem selected={false}
                            session={session}
                            selectionHandler={handler}/>, container);
  });
  // expect(container.innerHTML)
  //   .toMatchInlineSnapshot();
});
