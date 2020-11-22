import React from 'react'
import { useDispatch } from 'react-redux'
import { useProduct } from '../../hooks'

export interface OverviewProps {
  selectedProductId: string
}

export const Overview: React.FC<OverviewProps> = (props) => {
  const dispatch = useDispatch()
  const { selectedProductId } = props

  const product = useProduct(selectedProductId)

  return (
    <>
      <h2>Overview</h2>
      {
        product &&
          <span>{product.display_name}</span>
      }
    </>)
}
