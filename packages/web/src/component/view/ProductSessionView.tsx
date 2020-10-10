import React, { useRef, useState } from 'react'
import { SessionList } from '@teslapp/web/src/component/session'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSessionDetailsAction, fetchSessionListAction } from '@teslapp/web/src/component/session/actions'
import { AppState } from '@teslapp/web/src/store'
import { defaultConfig, LineChart } from '@teslapp/web/src/component/chart/LineChart'
import { SessionTagList } from '@teslapp/web/src/component/vehicle/SessionTagList'
import { StatsPanel } from '../stats/StatsPanel'
import { FilterPanel } from '../filter/FilterPanel'
import { CommandPanel } from '../command/CommandPanel'
import { DASHBOARD } from './Dashboard'
export interface ProductSessionViewProps {
  type: DASHBOARD.CHARGE | DASHBOARD.DRIVE
}

export const ProductSessionView: React.FC<ProductSessionViewProps> = ({type}) => {
  const dispatch = useDispatch()

  const productsSelector = (store: AppState) => store.product.products
  const selectedProductIdSelector = (store: AppState) =>
    store.product.selectedProductId
  const products = useSelector(productsSelector)
  const selectedProductId = useSelector(selectedProductIdSelector)

  const sessionsSelector = (store: AppState) => store.session.sessions
  const selectedSessionIdSelector = (store: AppState) =>
    store.session.selectedSessionId
  const sessions = useSelector(sessionsSelector)

  const selectedSessionId = useSelector(selectedSessionIdSelector)
  const selectedSessionStates = useSelector(
    (store: AppState) => store.session.selectedSessionStates,
  )

  const [lastResize, setLastResize] = useState(0)
  const [chartOptions, setChartOptions] = useState(defaultConfig)
  const mainContent = useRef(null)

  React.useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = products.find(
        (product) => product._id === selectedProductId,
      )
      if (selectedProduct) {
        dispatch(
          fetchSessionListAction(selectedProductId, { start: 0, size: 100 }, type),
        )
      }
    }
  }, [selectedProductId, type])

  React.useEffect(() => {
    if (selectedSessionId) {
      const selectedSession = sessions.find(
        (session) => session._id === selectedSessionId,
      )
      if (selectedSession) {
        dispatch(fetchSessionDetailsAction(selectedSessionId))
        onResize()
      }
    }
  }, [selectedSessionId])

  // React.useLayoutEffect(() => {
  //   window.addEventListener('resize', onResize)
  //   return () => mainContent.current.removeEventListener('resize', onResize)
  // })

  const onResize = () => {
    const { width, height } = mainContent.current.getBoundingClientRect()
    const calcWidth = width - 40
    const calcHeight = height / 2
    if ((chartOptions.height !== calcHeight || chartOptions.width !== calcWidth)
      && Date.now() - lastResize > 1000) {
      setLastResize(Date.now())
      console.log('calc', calcWidth, calcHeight)
      console.log('actual', chartOptions.width, chartOptions.height)

      setChartOptions({
        ...chartOptions,
        width: calcWidth,
        height: calcHeight,
      })
    }
  }

  return (
    <div className="columns three">
      <SessionList
        sessions={sessions}
        selectedSessionId={selectedSessionId}
        type={type}
      />
      <div ref={mainContent}>
        <LineChart datum={selectedSessionStates}
                   options={chartOptions}/>
        <SessionTagList/>
        <CommandPanel/>
      </div>
      <div>
        <StatsPanel/>
        <FilterPanel/>
      </div>
    </div>
  )
}
