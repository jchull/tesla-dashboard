import { useSelector } from 'react-redux'
import { AppState } from '../store'

export function useProduct(id?: string) {
  const productsSelector = (store: AppState) => store.product.products
  const products = useSelector(productsSelector)
  if (id) {
    const selectedProduct = products.find(
      (product) => product._id === id
    )
    return selectedProduct ?? null
  }
}
