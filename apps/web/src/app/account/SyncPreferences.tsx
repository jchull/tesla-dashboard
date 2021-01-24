/* eslint camelcase: 0 */
import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react'
import { SyncPreferences as UserSyncPreferences } from '@tesla-dashboard/types'
import { DEFAULT_SYNC_PREFERENCES } from '@tesla-dashboard/schemas'
import { services } from '@tesla-dashboard/client'
import './SyncPreferences.scss'

interface SyncPreferencesState {
  preferences?: UserSyncPreferences
  vehicleId: string
}

export const SyncPreferences: FC<SyncPreferencesState> = (
  props: SyncPreferencesState
) => {
  const [preferences, setPreferences] = useState(
    props.preferences || DEFAULT_SYNC_PREFERENCES
  )

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      _id,
      enabled,
      accountId,
      drivingPollingIntervalSeconds,
      drivingMinDurationMinutes,
      chargingMaxGapSeconds,
      drivingMaxGapSeconds,
      sleepTriggerSeconds,
      chargingMinDurationMinutes,
      chargingCostPerKwhHome,
      chargingCostPerKwhSupercharging,
      chargingPollingIntervalsSeconds
    } = Object.assign({}, preferences, {
      [event.target.name]: event.target.value
    })
    setPreferences({
      _id,
      enabled,
      accountId,
      drivingPollingIntervalSeconds,
      drivingMinDurationMinutes,
      chargingMaxGapSeconds,
      drivingMaxGapSeconds,
      sleepTriggerSeconds,
      chargingMinDurationMinutes,
      chargingCostPerKwhHome,
      chargingCostPerKwhSupercharging,
      chargingPollingIntervalsSeconds
    })
  }

  function resetForm() {
    setPreferences(DEFAULT_SYNC_PREFERENCES)
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    // TODO: Validation
    // TODO: move out of here?
    await services.userService.updateProductSyncPreferences(
      props.vehicleId,
      preferences
    )
  }

  function toggleEnabled() {
    setPreferences({ ...preferences, enabled: !preferences.enabled })
  }

  return (
    <div className='centered sync-preferences'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='enabled'>Automatic Synchronization</label>
        <input
          type='checkbox'
          name='enabled'
          checked={preferences.enabled}
          onChange={toggleEnabled}
        />
        <div className='row'>
          <section className='column'>
            <h3>Charging Preferences</h3>
            <label htmlFor='chargingCostPerKwhHome'>Home charging cost</label>
            <input
              placeholder='Home Charging Cost'
              name='chargingCostPerKwhHome'
              type='text'
              value={preferences.chargingCostPerKwhHome}
              onChange={handleChange}
            />
            <label htmlFor='chargingCostPerKwhSupercharging'>
              Supercharging Cost
            </label>
            <input
              placeholder='Supercharging Cost'
              name='chargingCostPerKwhSupercharging'
              type='text'
              value={preferences.chargingCostPerKwhSupercharging}
              onChange={handleChange}
            />
            <label htmlFor='chargingMinDurationMinutes'>
              Minimum Charging Duration
            </label>
            <input
              placeholder='Minimum Charging Duration'
              name='chargingMinDurationMinutes'
              type='text'
              value={preferences.chargingMinDurationMinutes}
              onChange={handleChange}
            />
          </section>

          <section className='column'>
            <h3>Driving Preferences</h3>
            <label htmlFor='drivingMinDurationMinutes'>
              Minimum Driving Duration
            </label>
            <input
              placeholder='Minimum Driving Duration'
              name='drivingMinDurationMinutes'
              type='text'
              value={preferences.drivingMinDurationMinutes}
              onChange={handleChange}
            />
          </section>
          <div className='row'>
            <section className='column'>
              <h3>Sync Preferences</h3>
              <label htmlFor='drivingPollingIntervalSeconds'>
                Driving Polling Interval
              </label>
              <input
                placeholder='Polling Interval'
                name='drivingPollingIntervalSeconds'
                type='text'
                value={preferences.drivingPollingIntervalSeconds}
                onChange={handleChange}
              />
              <label htmlFor='chargingPollingIntervalsSeconds1'>
                Level 1 Polling Interval
              </label>
              <input
                placeholder='Level 1 Polling Interval'
                name='chargingPollingIntervalsSeconds1'
                type='text'
                value={preferences.chargingPollingIntervalsSeconds[0]}
                // onChange={handleChange}
                readOnly
              />
              <label htmlFor='chargingPollingIntervalsSeconds2'>
                Level 2 Polling Interval
              </label>
              <input
                placeholder='Level 2 Polling Interval'
                name='chargingPollingIntervalsSeconds2'
                type='text'
                value={preferences.chargingPollingIntervalsSeconds[1]}
                // onChange={handleChange}
                readOnly
              />
              <label htmlFor='chargingPollingIntervalsSeconds3'>
                Level 3 Polling Interval
              </label>
              <input
                placeholder='Level 3 Polling Interval'
                name='chargingPollingIntervalsSeconds3'
                type='text'
                value={preferences.chargingPollingIntervalsSeconds[2]}
                // onChange={handleChange}
                readOnly
              />
            </section>
          </div>
        </div>

        <div>
          <button value='SUBMIT'
                  type='submit'>
            Save
          </button>
          <button type='reset'
                  onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
