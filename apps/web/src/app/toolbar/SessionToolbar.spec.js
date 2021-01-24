import React              from 'react'
import ReactDOM           from 'react-dom'
import { SessionToolbar } from './SessionToolbar'

it('renders default chart toolbar', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SessionToolbar />, div)
  ReactDOM.unmountComponentAtNode(div)
})
