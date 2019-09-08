import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import {IUser} from 'tesla-dashboard-api';
import {UserService} from '@service/UserService';

import './Account.scss';

interface AccountProps {
  user?: IUser;
}

const userService = new UserService();

export const AccountComponent: FC<AccountProps> = (props: AccountProps) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [user, setUser] = React.useState(props.user);
  const [password2, setPassword2] = useState('');
  const [passwordsValid, setPasswordsValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {username, password, email} = Object.assign({}, user, {[event.target.name]: event.target.value});
    setUser({username, password, email});
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (!user || !user.password || !user.username || !user.email) {
      console.log('Missing parameters for signup');
      return;
    }

    // TODO: for updates, check for _id?
    await userService.create(user.username, user.email, user.password);
  }

  useEffect(() => {
    // check passwords match
    const pv = user && user.password && user.password.length > 9 && user.password === password2 || false;
    setPasswordsValid(pv);
    // check form valid
    const fv = pv && user && user.username && user.email && emailRegex.test(user.email) || false;
    setFormValid(fv);

  }, [user, password2]);


  function resetForm() {
    setUser(undefined);
    setPassword2('');
  }

  return (
      <div className="account">
        <h3>Create Account</h3>
        <form onSubmit={handleSubmit}>
          <input
              placeholder="Username"
              name="username"
              type="text"
              onChange={handleChange}
          />
          <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
          />
          <input
              placeholder="Password"
              name="password"
              type="password"
              onChange={handleChange}
          />
          <input
              placeholder="Verify Password"
              name="password2"
              type="password"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword2(event.target.value)}
          />
          <div>
            <button value="SUBMIT"
                    type="submit"
                    disabled={!formValid}>
              Submit
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

