import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { types } from '@teslapp/common'
import numbro from 'numbro'

interface StatsState {
  type: string
}

const NUMBER_FORMAT_DEC = '0,0.00'

export const StatsPanel: React.FC<StatsState> = (props) => {
  const selectedSessionId = useSelector(
    (store: AppState) => store.session.selectedSessionId
  )
  const selectedSession = useSelector(
    (store: AppState) => store.session.sessions.find(sess => sess._id === selectedSessionId)
  )

  const loadedCount = useSelector(
    (store: AppState) => store.session.loadedCount
  )
  const totalCount = useSelector((store: AppState) => store.session.totalCount)
  const loading = useSelector((store: AppState) => store.session.loading)

  const sessions = useSelector((store: AppState) => store.session.sessions)
  const totalMiles = sessions.reduce((acc, cur: types.VehicleSession) => {
    if (cur.last?.vehicle_state.odometer && cur.first?.vehicle_state.odometer) {
      return acc + (cur.last.vehicle_state.odometer - cur.first.vehicle_state.odometer)
    }
    return acc
  }, 0)

  const allRangeMilesUsed = sessions.reduce((acc, cur: types.VehicleSession) => {
    if (cur.last?.charge_state.battery_range && cur.first?.charge_state.battery_range) {
      return acc + (cur.first.charge_state.battery_range - cur.last.charge_state.battery_range)
    }
    return acc
  }, 0)


  const currentRangeMilesUsed = (selectedSession?.first?.charge_state.battery_range ?? 0) - (selectedSession?.last?.charge_state.battery_range ?? 0)
  const currentDistance = (selectedSession?.last?.vehicle_state.odometer ?? 0) - (selectedSession?.first?.vehicle_state.odometer ?? 0)

  return (
    <div className="card">
      <h5>Stats</h5>
      {props.type.toLowerCase() === 'drive' && selectedSessionId ?
        (
          <>
            <section>
              <h6>Current</h6>
              <div>Distance: {numbro(currentDistance)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>
              <div>Range Used: {numbro(currentRangeMilesUsed)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>
            </section>

          </>
        ) : (
          <>
            <section>
              <h6>Current</h6>
              <div>Range Added: {numbro(1)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>

            </section>

          </>
        )}
      <section>
        <h6>Total</h6>
        {props.type.toLowerCase() === 'drive' ?
          (
            <>
              <div>Distance: {numbro(totalMiles)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>
              <div>Range Used: {numbro(allRangeMilesUsed)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>
            </>
          ) : (
            <>
              <div>Range Added: {numbro(allRangeMilesUsed * -1.0)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>
              <div>Energy Added: {numbro(-1.0)
                .format(NUMBER_FORMAT_DEC)} kWh
              </div>
            </>
          )
        }
      </section>
      <div className="card-footer">
        <div>
          {loading ? 'Loading...' : `Showing ${loadedCount} of ${totalCount}`}
        </div>

      </div>
    </div>
  )
}
