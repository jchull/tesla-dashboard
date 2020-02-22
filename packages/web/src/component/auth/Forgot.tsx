import React, { ChangeEvent, useState } from 'react';
import services from '@teslapp/web/src/service';
import { Redirect } from 'react-router';

export const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const loggedIn = services.auth.loggedIn();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    await services.auth.forgot(username);
    setMessage('If an account exists for this user, an email has been sent.');
  }

  return (
    <div>
      {loggedIn ? (
        <Redirect to="/" />
      ) : (
        <div className="centered">
          <h3>Reset Password</h3>
          <form>
            <input
              placeholder="Username"
              value={username}
              name="username"
              type="text"
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
            <a href="/login">Login</a>
            <a href="/signup">Create Account</a>
          </div>
          <div className="centered">{message && <h5>{message}</h5>}</div>
        </div>
      )}
    </div>
  );
};
