import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { types } from '@teslapp/common'
import numbro from 'numbro'

const NUMBER_FORMAT_DEC = '0,0.00'

export const StatsPanel: React.FC = () => {
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
  const totalMiles = sessions.reduce((acc, cur: types.VehicleActivity) => {
    if (cur.last?.vehicle_state.odometer && cur.first?.vehicle_state.odometer) {
      return acc + (cur.last.vehicle_state.odometer - cur.first.vehicle_state.odometer)
    }
    return acc
  }, 0)

  const allRangeMilesUsed = sessions.reduce((acc, cur: types.VehicleActivity) => {
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
      {selectedSession?.activity === types.ActivityType.DRIVING ?
        (
          <>
            <section>
              <h6>Current</h6>
              <div>Distance: {numbro(currentDistance ?? 0)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>
              <div>Range Used: {numbro(currentRangeMilesUsed ?? 0)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>
            </section>

          </>
        ) : (
          <>
            <section>
              <h6>Current</h6>
              <div>Range Added: {numbro(0)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>

            </section>

          </>
        )}
      <section>
        <h6>Total</h6>
        {selectedSession?.activity === types.ActivityType.DRIVING ?
          (
            <>
              <div>Distance: {numbro(totalMiles ?? 0)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>
              <div>Range Used: {numbro(allRangeMilesUsed ?? 0)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>
            </>
          ) : (
            <>
              <div>Range Added: {numbro(allRangeMilesUsed * -1.0)
                .format(NUMBER_FORMAT_DEC)} mi
              </div>
              <div>Energy Added: {numbro(0)
                .format(NUMBER_FORMAT_DEC)} kWh
              </div>
            </>
          )
        }
      </section>
      <div className="card-footer">
        <div>
          {loading ? 'Loading...' : `Showing ${loadedCount ?? 0} of ${totalCount ?? 'unknown'}`}
        </div>

      </div>
    </div>
  )
}
