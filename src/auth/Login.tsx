import React, {ChangeEvent, useState} from 'react';
import {authenticationService} from '@service/Services';
import {Redirect} from 'react-router';


export const LoginComponent = () => {

  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [loggedIn, setLoggedIn] = useState(authenticationService.loggedIn());
  const [message, setMessage] = useState();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {username, password} = Object.assign({}, credentials, {[event.target.name]: event.target.value});
    setCredentials({username, password});
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const {username, password} = credentials;
    const result = await authenticationService.login(username, password);
    if (!result) {
      setMessage('Login failed');
    }
    setLoggedIn(result);
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
              <div className="links">
                <a href='/signup'>Create Account</a>
                <a href='/forgot'>Forgot Password</a>
              </div>

            </div>
        }
        <div className="centered">
          {message &&
          <h5>{message}</h5>}
        </div>
      </div>
  );
};

