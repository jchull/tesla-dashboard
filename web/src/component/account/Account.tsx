import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';
import services from '@service/service';
import {useSelector} from 'react-redux';
import {AppState} from '@store/store';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_USER = {username: '', password: '', email: '', role: 0};

export const AccountComponent: FC = () => {
  const auth = useSelector((store: AppState) => store.auth);
  const [formData, setFormData] = useState({
                                             username: auth.username ?? '',
                                             email: '',
                                             password1: '',
                                             password2: '',
                                             authPassword: '',
                                             $valid: false
                                           });
  const [passwordsValid, setPasswordsValid] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if(auth.loggedIn){
      // update account
      // TODO
    } else {
      // create new account
      if (!formData.username || !formData.password1 || formData.password1 !== formData.password2 || !formData.email) {
        console.log('Missing parameters for signup');
        return;
      }
      await services.userService.createUser(formData.username, formData.email, formData.password1);
    }

  }

  // useEffect(() => {
  //   // check passwords match
  //   const pv = user && user.password && user.password.length > 9 && user.password === password2 || false;
  //   setPasswordsValid(pv);
  //   // check form valid
  //   const fv = pv && user && user.username && user.email && emailRegex.test(user.email) || false;
  //   setFormValid(fv);
  //
  // }, [user, password2]);


  function resetForm() {
     // TODO: will have to handle existing users
  }


  return (
      <div className="centered">
        <h3>Create Account</h3>
          <form onSubmit={handleSubmit}>
            <input
                placeholder="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
            />
            <input
                placeholder="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                placeholder="Password"
                name="password1"
                type="password1"
                value={formData.password1}
                onChange={handleChange}
            />
            <input
                placeholder="Verify Password"
                name="password2"
                type="password"
                value={formData.password2}
                onChange={handleChange}
            />
            <div>
              <button value="SUBMIT"
                      type="submit"
                      disabled={!formData.$valid}>
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

