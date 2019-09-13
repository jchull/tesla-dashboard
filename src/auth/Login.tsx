import React, {ChangeEvent, useState} from 'react';
import {authenticationService} from '@service/Services';
import {Redirect, withRouter} from 'react-router';


export const LoginComponent = withRouter((props) => {

  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [loggedIn, setLoggedIn] = useState(authenticationService.loggedIn());

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {username, password} = Object.assign({}, credentials, {[event.target.name]: event.target.value});
    setCredentials({username, password});
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const {username, password} = credentials;
    setLoggedIn(await authenticationService.login(username, password));
  }

  return (
      <div>
        {loggedIn ?
            <Redirect to="/"/>
            :
            <div className="centered">
              <h3>Login</h3>
              <form>
                <input
                    placeholder="Username"
                    value={credentials.username}
                    name="username"
                    type="text"
                    onChange={handleChange}
                />
                <input
                    placeholder="Password"
                    value={credentials.password}
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
                <input
                    className="form-submit"
                    value="SUBMIT"
                    type="submit"
                    onClick={handleSubmit}
                />
              </form>
            </div>
        }
      </div>
  );
});

