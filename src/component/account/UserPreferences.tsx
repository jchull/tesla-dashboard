import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import {IUserPreferences} from 'tesla-dashboard-api';
import { DEFAULT_PREFERENCES } from 'tesla-dashboard-api/lib/types/UserPreferences';


interface PreferencesState {
  preferences: IUserPreferences;
}


export const UserPreferences: FC<PreferencesState> = props => {

  const [preferences, setPreferences] = useState(props.preferences || DEFAULT_PREFERENCES);
  const [formValid, setFormValid] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      display_distanceUnits,
      display_currencyCode,
      display_tempUnits,
      driving_pollingIntervalsSeconds,
      driving_minDurationMinutes,
      charging_minDurationMinutes,
      charging_costPerKwhHome,
      charging_costPerKwhSupercharging,
      charging_pollingIntervalsSeconds
    } = Object.assign({}, preferences, {[event.target.name]: event.target.value});
    setPreferences({
      username: 'default',
      display_distanceUnits,
      display_currencyCode,
      display_tempUnits,
      driving_pollingIntervalsSeconds,
      driving_minDurationMinutes,
      charging_minDurationMinutes,
      charging_costPerKwhHome,
      charging_costPerKwhSupercharging,
      charging_pollingIntervalsSeconds
    });
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    // TODO: for updates, check for _id?
    //await userService.create(user.username, user.email, user.password);
  }

  useEffect(() => {
    // // check form valid
    const fv = !!preferences;
    setFormValid(fv);

  }, [preferences]);


  function resetForm() {
    // setUser(undefined);
    // setPassword2('');
  }


  return (
      <div className="centered">
        <form onSubmit={handleSubmit}>
          <section>
            <h3>Display Preferences</h3>
            <label htmlFor="display_distanceUnits">Distance Units</label>
            <input
                placeholder="Distance Units"
                name="display_distanceUnits"
                type="text"
                value={preferences.display_distanceUnits}
                onChange={handleChange}
            />
            <label htmlFor="display_currencyCode">Currency</label>
            <input
                placeholder="Currency"
                name="display_currencyCode"
                type="text"
                value={preferences.display_currencyCode}
                onChange={handleChange}
            />
            <label htmlFor="display_tempUnits">Temperature Units</label>
            <input
                placeholder="Temperature Units"
                name="display_tempUnits"
                type="text"
                value={preferences.display_tempUnits}
                onChange={handleChange}
            />
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
            <label htmlFor="driving_pollingIntervalsSeconds">Polling Interval</label>
            <input
                placeholder="Polling Interval"
                name="driving_pollingIntervalsSeconds"
                type="text"
                value={preferences.driving_pollingIntervalsSeconds}
                onChange={handleChange}
            />
          </section>
          <div>
            <button value="SUBMIT"
                    type="submit"
                    disabled={!formValid}>
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
