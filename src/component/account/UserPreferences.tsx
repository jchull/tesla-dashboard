import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import {UserPreferences as IUserPreferences, DEFAULT_PREFERENCES} from 'tesla-dashboard-api';


interface PreferencesState {
  preferences: IUserPreferences;
}


export const UserPreferences: FC<PreferencesState> = (props: PreferencesState) => {

  const [preferences, setPreferences] = useState(props.preferences || DEFAULT_PREFERENCES);
  const [formValid, setFormValid] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      displayDistanceUnits,
      displayCurrencyCode,
      displayTempUnits,
      username
    } = Object.assign({}, preferences, {[event.target.name]: event.target.value});
    setPreferences({
                     username,
                     displayDistanceUnits,
                     displayCurrencyCode,
                     displayTempUnits
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
                value={preferences.displayDistanceUnits}
                onChange={handleChange}
            />
            <label htmlFor="displayCurrencyCode">Currency</label>
            <input
                placeholder="Currency"
                name="displayCurrencyCode"
                type="text"
                value={preferences.displayCurrencyCode}
                onChange={handleChange}
            />
            <label htmlFor="displayTempUnits">Temperature Units</label>
            <input
                placeholder="Temperature Units"
                name="displayTempUnits"
                type="text"
                value={preferences.displayTempUnits}
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
