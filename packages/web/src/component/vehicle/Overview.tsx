import React from 'react'
import { useDispatch } from 'react-redux'
import { useProduct } from '../../hooks'
import { syncUpstreamAction } from '../product/actions'

export interface OverviewProps {
  productId: string
}

export const Overview: React.FC<OverviewProps> = (props) => {
  const dispatch = useDispatch()
  const { productId } = props

  const product = useProduct(productId)

  async function syncNow() {
    dispatch(syncUpstreamAction(productId))
  }

  return (
    <>
      <h2>Overview</h2>
      {
        product &&
        <>
          <span>{product.display_name}</span>

          <button onClick={() => syncNow()}>
            <i className="material-icons">sync</i>
          </button>
        </>
      }
    </>)
}
