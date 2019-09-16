import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import {ITeslaAccount} from 'tesla-dashboard-api';
import {authenticationService, userService} from '@service/Services';


interface TeslaAccountProps {
  account: ITeslaAccount;
}


export const TeslaAccountComponent: FC<TeslaAccountProps> = props => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [account, setAccount] = useState(props.account || {});
  const [formValid, setFormValid] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {email, access_token, refresh_token} = Object.assign({}, account, {[event.target.name]: event.target.value});
    setAccount({email, access_token, refresh_token});
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    // TODO: for updates, check for _id?
    //await userService.create(user.username, user.email, user.password);
  }

  useEffect(() => {
    // // check form valid
    const fv = account && account.access_token && account.refresh_token && account.email && emailRegex.test(account.email) || false;
    setFormValid(fv);

  }, [account]);


  function resetForm() {
    // setUser(undefined);
    // setPassword2('');
  }

  function getTokens() {
//TODO: get tokens from tesla service, requires password
  }


  useEffect(() => {
    const username = authenticationService.getUsername();
    if (username) {
      // userService.getTeslaAccounts(username)
      //            .then((data: ITeslaAccount | undefined) => data && setAccount(data));
    }
  }, []);

  return (
      <div className="centered">
        <h3>Tesla Account</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
              placeholder="Email"
              name="email"
              type="email"
              value={account.email}
              onChange={handleChange}
          />
          <label htmlFor="token">Token</label>
          <input
              placeholder="Token"
              name="token"
              type="password"
              value={account.access_token}
              onChange={handleChange}
          />
          <label htmlFor="refresh_token">Refresh Token</label>
          <input
              placeholder="Refresh Token"
              name="refresh_token"
              type="password"
              value={account.refresh_token}
              onChange={handleChange}
          />
          <button
              onClick={getTokens}>
            Get Tokens From Tesla
          </button>

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

