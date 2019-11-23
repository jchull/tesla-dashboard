import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import {IUser} from 'tesla-dashboard-api';
import {userService} from '@service/index.ts';

interface AccountProps {
  user?: IUser;
}

const DEFAULT_USER = {username: '', password: '', email: '', role: 0};

export const AccountComponent: FC<AccountProps> = props => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [user, setUser] = React.useState(props.user || DEFAULT_USER);
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
    await userService.createUser(user.username, user.email, user.password);
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
    setUser(DEFAULT_USER); // TODO: will have to handle existing users
    setPassword2('');
  }


  return (
      <div className="centered">
        <h3>Create Account</h3>
        {
          user ?
              <form onSubmit={handleSubmit}>
                <input
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={user.username}
                    onChange={handleChange}
                />
                <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                />
                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <input
                    placeholder="Verify Password"
                    name="password2"
                    type="password"
                    value={password2}
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
              :
              <span>User does not exist</span>
        }
      </div>
  );
};

