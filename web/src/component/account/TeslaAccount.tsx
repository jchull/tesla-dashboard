import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useEffect,
  useState
} from 'react';
import {TeslaAccount} from '@model/index';
import services from '@service/service';
import {TeslaTokenComponent} from '@component/account/TeslaTokenUpdater';

interface TeslaAccountProps {
  account: TeslaAccount;
}

export const TeslaAccountComponent: FC<TeslaAccountProps> = (
    props: TeslaAccountProps
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showTeslaTokenUpdater, setShowTeslaTokenUpdater] = useState(false);
  const [account, setAccount] = useState(props.account || {});
  const [formValid, setFormValid] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const {
      _id,
      username,
      email,
      access_token,
      refresh_token
    } = Object.assign({}, account, {[event.target.name]: event.target.value});
    // eslint-disable-next-line @typescript-eslint/camelcase
    setAccount({_id, username, email, access_token, refresh_token});
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (account.username && account.email) {
      // TODO: Validation
      console.log('submit tesla account form');
      if (account._id) {
        const result = await services.userService.updateTeslaAccount(account);
      } else {
        const newTeslaAccount = await services.userService.linkTeslaAccount(account);
        if (newTeslaAccount._id) {
          console.log('new tesla account linked');
          // TODO: global message
        }
      }

    }
  }

  useEffect(() => {
    const fv =
        (account &&
         account.email &&
         emailRegex.test(account.email)) ||
        false;
    setFormValid(fv);
  }, [account.email]);

  function resetForm() {
    setAccount(props.account || {});
    setShowTeslaTokenUpdater(false);
  }

  function getTokens() {
    setShowTeslaTokenUpdater(true);
  }

  function validateToken() {
    //TODO
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
          <button onClick={getTokens} disabled={!account.email || !account._id}>Get Tokens From Tesla</button>
          <button onClick={validateToken} disabled={!account.email || !account._id || !account.access_token}>Validate
            Token
          </button>

          <div>
            <button value="SUBMIT" type="submit" disabled={!formValid}>
              Save
            </button>
            <button type="reset" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>
        {showTeslaTokenUpdater && <TeslaTokenComponent account={account}/>}
      </div>
  );
};
