import React from 'react'
import { render } from '@testing-library/react'
import { App } from './App'
import { Provider } from 'react-redux'
import services from '@teslapp/web/src/service'
import { configureStore } from '@teslapp/web/src/store'

test('renders header', () => {
  const store = configureStore(services)
  const { getByText } = render(
    <Provider store={store}>
      <App/>
    </Provider>
  )
  expect(getByText('Energy Dashboard'))
    .toBeInTheDocument()
})
