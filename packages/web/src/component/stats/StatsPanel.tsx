import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { DriveSession } from '@teslapp/common'
import numbro from 'numbro';

interface StatsState {
}

const NUMBER_FORMAT_DEC = '0,0.00'

export const StatsPanel: React.FC<StatsState> = (props) => {
  const selectedSessionId = useSelector(
    (store: AppState) => store.session.selectedSessionId,
  )
  const selectedSession = useSelector(
    (store: AppState) => store.session.sessions.find(sess => sess._id === selectedSessionId),
  )

  const loadedCount = useSelector(
    (store: AppState) => store.session.loadedCount,
  )
  const totalCount = useSelector((store: AppState) => store.session.totalCount)
  const loading = useSelector((store: AppState) => store.session.loading)

  const sessions = useSelector((store: AppState) => store.session.sessions)
  const totalMiles = sessions.reduce((acc, cur: DriveSession) => {
    if (cur.last?.odometer && cur.first?.odometer) {
      return acc + (cur.last.odometer - cur.first.odometer)
    }
    return acc
  }, 0)

  const allRangeMilesUsed = sessions.reduce((acc, cur: DriveSession) => {
    if (cur.last?.battery_range && cur.first?.battery_range) {
      return acc + (cur.first.battery_range - cur.last.battery_range)
    }
    return acc
  }, 0)

  const currentRangeMilesUsed = (selectedSession?.first?.battery_range ?? 0) - (selectedSession?.last?.battery_range ?? 0)
  // @ts-ignore
  const currentDistance = (selectedSession?.last?.odometer ?? 0) - (selectedSession?.first?.odometer ?? 0)

  return (
    <div className="card">
      <h5>Stats</h5>
      {selectedSessionId ? (
        <>
          <section>
            <h6>Current</h6>
            <div>Distance: {numbro(currentDistance).format(NUMBER_FORMAT_DEC)} mi</div>
            <div>Range Used: {numbro(currentRangeMilesUsed).format(NUMBER_FORMAT_DEC)} mi</div>
          </section>
          <section>
            <h6>Total</h6>
            <div>Distance: {numbro(totalMiles).format(NUMBER_FORMAT_DEC)} mi</div>
            <div>Range Used: {numbro(allRangeMilesUsed).format(NUMBER_FORMAT_DEC)} mi</div>
          </section>
        </>
      ) : (
        <span>select something</span>
      )}
      <div className="card-footer">
        <div>
          Showing {loadedCount} of {totalCount}
        </div>
        {loading && <div>loading...</div>}
      </div>
    </div>
  )
}
