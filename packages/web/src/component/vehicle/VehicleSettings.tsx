import React from 'react'
import { useDispatch } from 'react-redux'
import { useProduct } from '../../hooks'

export interface SettingsProps {
  selectedProductId: string
}

export const VehicleSettings: React.FC<SettingsProps> = (props) => {
  const dispatch = useDispatch()
  const { selectedProductId } = props

  const product = useProduct(selectedProductId)


  return (
    <>
      <h2>Settings</h2>
      {
        product &&
        <>
          <span>{product.display_name}</span>


        </>
      }
    </>)
}
