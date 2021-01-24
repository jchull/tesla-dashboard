import { act, render } from '@testing-library/react'
import pretty          from 'pretty'
import React           from 'react'

import { SessionListItem } from './SessionListItem'

let wrapper

beforeEach(() => {})

afterEach(() => {
  if(wrapper) {
    if(wrapper.unmount) {
      wrapper.unmount()
    }
    if(wrapper.container) {
      wrapper.container = null
    }
  }
})

it('renders session list item', () => {
  const session = {
    _id: 'test1',
    start_date: 1566773736152,
    end_date: 1566773789552,
    first: {
      odometer: 75
    },
    last: {
      odometer: 77.2
    }
  }

  const handler = (session) => console.log(session._id)

  act(() => {
    wrapper = render(
      <SessionListItem
        selected={false}
        session={session}
        selectionHandler={handler}
      />
    )
  })
  expect(pretty(wrapper.container.innerHTML))
    .toMatchSnapshot()
})
