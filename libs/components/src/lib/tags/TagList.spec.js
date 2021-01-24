import { fireEvent, render } from '@testing-library/react'
import pretty                from 'pretty'
import React                 from 'react'

import { TagList } from './TagList'

let wrapper

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  if(wrapper) {
    if(wrapper.unmount) {
      wrapper.unmount()
    }
    if(wrapper) {
      wrapper = null
    }
  }
  jest.useRealTimers()
})

it('renders empty tag list', () => {
  wrapper = render(
    <TagList tags={[]}
             addListener={console.log}
             removeListener={console.log} />
  )
  expect(pretty(wrapper.container.innerHTML))
    .toMatchSnapshot()
})

it('renders simple tag list', () => {
  wrapper = render(
    <TagList
      tags={['item_1', 'item_2']}
      addListener={console.log}
      removeListener={console.log}
    />
  )
  expect(pretty(wrapper.container.innerHTML))
    .toMatchSnapshot()
})

xit('adds tag from input', async() => {
  const addListener = (tag) => {
    return [tag]
  }

  wrapper = render(
    <TagList tags={[]}
             addListener={addListener}
             removeListener={console.log} />
  )
  const v = await wrapper.findByLabelText('Show new tag entry')
  if(v) {
    v.toString()
  }
  await fireEvent.click(v)

  jest.advanceTimersByTime(1000)
  const input = wrapper.getByLabelText('Enter new tag')
  fireEvent.change(input, { target: { value: 'abc1' } })
  fireEvent.keyPress(input, {
    key: 'Enter',
    code: 13
  })

  expect(pretty(wrapper.asFragment()))
    .toMatchSnapshot()
})
