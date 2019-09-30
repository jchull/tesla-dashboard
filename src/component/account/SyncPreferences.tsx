import React, {ChangeEvent, FC, SyntheticEvent, useState} from 'react';
import {DEFAULT_SYNC_PREFERENCES, ISyncPreferences} from 'tesla-dashboard-api';
import {userService} from '@service/Services';


interface SyncPreferencesState {
  preferences?: ISyncPreferences;
  vehicleId: string;
}


export const SyncPreferences: FC<SyncPreferencesState> = props => {

  const [preferences, setPreferences] = useState(props.preferences || DEFAULT_SYNC_PREFERENCES);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      _id,
      enabled,
      account_id,
      driving_pollingIntervalSeconds,
      driving_minDurationMinutes,
      charging_maxGapSeconds,
      driving_maxGapSeconds,
      sleepTriggerSeconds,
      charging_minDurationMinutes,
      charging_costPerKwhHome,
      charging_costPerKwhSupercharging,
      charging_pollingIntervalsSeconds
    } = Object.assign({}, preferences, {[event.target.name]: event.target.value});
    setPreferences({
      _id,
      enabled,
      account_id,
      driving_pollingIntervalSeconds,
      driving_minDurationMinutes,
      charging_maxGapSeconds,
      driving_maxGapSeconds,
      sleepTriggerSeconds,
      charging_minDurationMinutes,
      charging_costPerKwhHome,
      charging_costPerKwhSupercharging,
      charging_pollingIntervalsSeconds
    });
  }

  function resetForm() {
    setPreferences(DEFAULT_SYNC_PREFERENCES);
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    // TODO: Validation
    await userService.updateProductSyncPreferences(props.vehicleId, preferences);
  }

  function toggleEnabled() {
    setPreferences(Object.assign({}, preferences, {enabled: !preferences.enabled}));
  }

  return (
      <div className="centered">
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="enabled">Enabled</label>
            <input type="checkbox"
                   name="enabled"
                   checked={preferences.enabled}
                   onChange={toggleEnabled}/>
          </section>
          <section>
            <h3>Charging Preferences</h3>
            <label htmlFor="charging_costPerKwhHome">Home charging cost</label>
            <input
                placeholder="Home Charging Cost"
                name="charging_costPerKwhHome"
                type="text"
                value={preferences.charging_costPerKwhHome}
                onChange={handleChange}
            />
            <label htmlFor="charging_costPerKwhSupercharging">Supercharging Cost</label>
            <input
                placeholder="Supercharging Cost"
                name="charging_costPerKwhSupercharging"
                type="text"
                value={preferences.charging_costPerKwhSupercharging}
                onChange={handleChange}
            />
            <label htmlFor="charging_minDurationMinutes">Minimum Charging Duration</label>
            <input
                placeholder="Minimum Charging Duration"
                name="charging_minDurationMinutes"
                type="text"
                value={preferences.charging_minDurationMinutes}
                onChange={handleChange}
            />
            <label htmlFor="charging_pollingIntervalsSeconds1">Level 1 Polling Interval</label>
            <input
                placeholder="Level 1 Polling Interval"
                name="charging_pollingIntervalsSeconds1"
                type="text"
                value={preferences.charging_pollingIntervalsSeconds[0]}
                // onChange={handleChange}
                readOnly
            />
            <label htmlFor="charging_pollingIntervalsSeconds2">Level 2 Polling Interval</label>
            <input
                placeholder="Level 2 Polling Interval"
                name="charging_pollingIntervalsSeconds2"
                type="text"
                value={preferences.charging_pollingIntervalsSeconds[1]}
                // onChange={handleChange}
                readOnly
            />
            <label htmlFor="charging_pollingIntervalsSeconds3">Level 3 Polling Interval</label>
            <input
                placeholder="Level 3 Polling Interval"
                name="charging_pollingIntervalsSeconds3"
                type="text"
                value={preferences.charging_pollingIntervalsSeconds[2]}
                // onChange={handleChange}
                readOnly
            />
          </section>

          <section>
            <h3>Driving Preferences</h3>
            <label htmlFor="driving_minDurationMinutes">Minimum Driving Duration</label>
            <input
                placeholder="Minimum Driving Duration"
                name="driving_minDurationMinutes"
                type="text"
                value={preferences.driving_minDurationMinutes}
                onChange={handleChange}
            />
            <label htmlFor="driving_pollingIntervalSeconds">Polling Interval</label>
            <input
                placeholder="Polling Interval"
                name="driving_pollingIntervalSeconds"
                type="text"
                value={preferences.driving_pollingIntervalSeconds}
                onChange={handleChange}
            />
          </section>

          <div>
            <button value="SUBMIT"
                    type="submit">
              Save
            </button>
            <button type="reset"
                    onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>
      </div>
  );
};
