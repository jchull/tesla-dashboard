import { act, render }     from '@testing-library/react'
import pretty              from 'pretty'
import React               from 'react'
import { getMockProvider } from '../../__mocks__/ReduxMockWrapper'


import { SessionTagList } from './SessionTagList'

let wrapper

beforeEach(() => {
})

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


it('renders empty tag list', () => {
  const { ReduxMockWrapper } = getMockProvider({ session: { sessions: [] } })

  act(() => {
    wrapper = render(<ReduxMockWrapper><SessionTagList/></ReduxMockWrapper>)
  })
  expect(pretty(wrapper.container.innerHTML))
    .toMatchSnapshot()
})

