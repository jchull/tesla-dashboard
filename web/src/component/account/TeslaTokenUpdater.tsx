import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import services from '@service/service';
import {TeslaAccount} from '@model/TeslaAccount';


interface TeslaTokenProps {
  account: TeslaAccount;
}


export const TeslaTokenComponent: FC<TeslaTokenProps> = (props: TeslaTokenProps) => {

  const [formValid, setFormValid] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    // validate and update input value
    setPassword(event.target.value);
    if(password && password.length){
      setFormValid(true);
    }

  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if(props.account && password) {
      const account = await services.userService.updateTeslaToken(props.account, password);
      if (account) {
        setMessage('Tesla ID Token validated');
      } else {
        setMessage('Error validating Tesla ID Token');
      }
    } else {
      setMessage('account or password missing');
    }
  }




  return (
      <div className="dialog">
        <h3>Tesla Account Token Updater</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="token">Password</label>
          <input
              placeholder="Tesla Password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
          />
          <button value="SUBMIT"
                  type="submit"
                  disabled={!formValid}>
            Get new token from Tesla
          </button>

        </form>
        {message}
      </div>
  );
};

