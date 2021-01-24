import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { AppState } from '../store'
import { services } from '@tesla-dashboard/client'
import { Provider } from 'react-redux'

// @ts-ignore
jest.mock('@tesla-dashboard/client')

export const getMockProvider = (partialState: Partial<AppState>) => {
  const mockStore = configureMockStore([
    thunk.withExtraArgument({ api: services }),
  ])

  const store = mockStore(partialState)

  return {
    ReduxMockWrapper: ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    ),
    store,
  }
}
