import React, { ChangeEvent, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from './actions'
import { useHistory, useLocation } from 'react-router-dom'

interface AuthState {
  auth: {
    loggedIn: boolean
    message: string
  }
}

export const LoginComponent = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const loggedIn = useSelector((store: AuthState) => store.auth.loggedIn)
  const message = useSelector((store: AuthState) => store.auth.message)
  const dispatch = useDispatch()

  const history = useHistory()
  const location = useLocation()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { username, password } = Object.assign({}, credentials, {
      [event.target.name]: event.target.value
    })
    setCredentials({ username, password })
  }

  async function handleSubmit(event: any) {
    event.preventDefault()
    const { username, password } = credentials
    dispatch(loginAction(username, password))
  }

  useEffect(() => {
    if (loggedIn) {
      history.push('/dashboard')
    }
  }, [loggedIn])

  return (
    <div className='login'>
      {loggedIn ? (
        <Redirect to={location} />
      ) : (
        <div className='centered narrow'>
          <h3>Login</h3>
          <form>
            <input
              placeholder='Username'
              value={credentials.username}
              name='username'
              type='text'
              onChange={handleChange}
            />
            <input
              placeholder='Password'
              value={credentials.password}
              name='password'
              type='password'
              onChange={handleChange}
            />
            <input
              className='form-submit'
              value='SUBMIT'
              type='submit'
              onClick={handleSubmit}
            />
          </form>
          <div className='links'>
            <a href='/signup'>Create Account</a>
            <a href='/forgot'>Forgot Password</a>
          </div>
        </div>
      )}
      <div className='centered narrow'>{message && <h5>{message}</h5>}</div>
    </div>
  )
}
