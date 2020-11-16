import { ProductList }     from '@teslapp/web/src/component/product/ProductList'
import services            from '@teslapp/web/src/service'
import { act, render }     from '@testing-library/react'
import pretty              from 'pretty'
import React               from 'react'
import { getMockProvider } from '../../__mocks__/ReduxMockWrapper'

jest.mock('@teslapp/web/src/service')

services.queryService.getProducts = jest.fn(() => {
  return new Promise((resolve, reject) => resolve([]))
})


describe('Product List', () => {
  let wrapper


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


  it('renders empty product list', () => {
    const { ReduxMockWrapper } = getMockProvider({ auth: { loggedIn: false } })

    act(() => {
      wrapper = render(<ReduxMockWrapper><ProductList products={[]}/></ReduxMockWrapper>)
    })
    expect(pretty(wrapper.container.innerHTML))
      .toMatchSnapshot()
  })

})
