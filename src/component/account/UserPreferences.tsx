import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import {IUserPreferences, DEFAULT_PREFERENCES} from 'tesla-dashboard-api';


interface PreferencesState {
  preferences: IUserPreferences;
}


export const UserPreferences: FC<PreferencesState> = (props: PreferencesState) => {

  const [preferences, setPreferences] = useState(props.preferences || DEFAULT_PREFERENCES);
  const [formValid, setFormValid] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      display_distanceUnits,
      display_currencyCode,
      display_tempUnits,
      username
    } = Object.assign({}, preferences, {[event.target.name]: event.target.value});
    setPreferences({
                     username,
                     display_distanceUnits,
                     display_currencyCode,
                     display_tempUnits
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
