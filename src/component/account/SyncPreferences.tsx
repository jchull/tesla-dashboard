import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {DEFAULT_SYNC_PREFERENCES, ISyncPreferences} from 'tesla-dashboard-api';


interface SyncPreferencesState {
  preferences?: ISyncPreferences;

  onSyncPrefsChange(preferences: ISyncPreferences): any;
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
      charging_minDurationMinutes,
      charging_costPerKwhHome,
      charging_costPerKwhSupercharging,
      charging_pollingIntervalsSeconds
    });
  }

  useEffect(() => {
    props.onSyncPrefsChange(preferences);
  }, [preferences]);

  return (
      <div>
        <section>
          <h3>Sync</h3>
          <input type="checkbox"
                 checked={preferences.enabled}>Enabled</input>
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
          />
          <label htmlFor="charging_pollingIntervalsSeconds2">Level 2 Polling Interval</label>
          <input
              placeholder="Level 2 Polling Interval"
              name="charging_pollingIntervalsSeconds2"
              type="text"
              value={preferences.charging_pollingIntervalsSeconds[1]}
              // onChange={handleChange}
          />
          <label htmlFor="charging_pollingIntervalsSeconds3">Level 3 Polling Interval</label>
          <input
              placeholder="Level 3 Polling Interval"
              name="charging_pollingIntervalsSeconds3"
              type="text"
              value={preferences.charging_pollingIntervalsSeconds[2]}
              // onChange={handleChange}
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
      </div>
  );
};
