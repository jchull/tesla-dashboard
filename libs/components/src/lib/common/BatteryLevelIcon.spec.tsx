import React from 'react'
import { wait } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { BatteryLevelIcon } from './BatteryLevelIcon'

describe('Battery Icon', () => {
  it('renders empty battery', async () => {
    const { queryByText } = render(
      <BatteryLevelIcon batteryLevel={0}
                        width={100} />
    )

    await wait(() => expect(queryByText(/Battery Level/))
      .toBeTruthy())

    // const el = await waitForElement(() => getByText(/Battery Level/));
  })

  it('renders low battery', () => {
    const { getByLabelText } = render(
      <BatteryLevelIcon batteryLevel={10}
                        width={100} />
    )

    // TODO: assert
  })

  it('renders normal battery', () => {
    const { getByLabelText } = render(
      <BatteryLevelIcon batteryLevel={50}
                        width={100} />
    )

    // TODO: assert
  })

  it('renders high battery', () => {
    const { getByLabelText } = render(
      <BatteryLevelIcon batteryLevel={99}
                        width={100} />
    )

    // TODO: assert
  })
})
