import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import {TeslaAccount} from 'tesla-dashboard-api';
import services from '@service/service';


interface TeslaAccountProps {
  account: TeslaAccount;
}


export const TeslaAccountComponent: FC<TeslaAccountProps> = (props: TeslaAccountProps) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [account, setAccount] = useState(props.account || {});
  const [formValid, setFormValid] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const {_id, username, email, access_token, refresh_token} = Object.assign({}, account, {[event.target.name]: event.target.value});
    // eslint-disable-next-line @typescript-eslint/camelcase
    setAccount({_id, username, email, access_token, refresh_token});
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    // TODO: Validation
    await services.userService.updateTeslaAccount(account);
  }

  useEffect(() => {
    // // check form valid
    const fv = account && account.access_token && account.refresh_token && account.email && emailRegex.test(account.email) || false;
    setFormValid(fv);

  }, [account]);


  function resetForm() {
    setAccount(props.account || {});
  }

  function getTokens() {
//TODO: get tokens from tesla service, requires password
  }

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
              onClick={getTokens}
              disabled>
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

