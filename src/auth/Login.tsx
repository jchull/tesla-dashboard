import React, {ChangeEvent, useState} from 'react';
import {Redirect} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '@store/store';
import {loginAction} from './actions';


export const LoginComponent = () => {

  const [credentials, setCredentials] = useState({username: '', password: ''});
  const loggedIn = useSelector((store:AppState) => store.auth.loggedIn);
  const message = useSelector((store:AppState) => store.auth.message);
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {username, password} = Object.assign({}, credentials, {[event.target.name]: event.target.value});
    setCredentials({username, password});
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const {username, password} = credentials;
    dispatch(loginAction(username,password));
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

