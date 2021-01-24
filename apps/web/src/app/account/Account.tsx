import React, { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react'
import { services } from '@tesla-dashboard/client'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { useHistory } from 'react-router-dom'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const AccountComponent: FC = () => {
  const history = useHistory()
  const auth = useSelector((store: AppState) => store.auth)
  const [formData, setFormData] = useState({
    username: auth.username || '',
    email: '',
    password1: '',
    password2: '',
    authPassword: ''
  })
  const [formValid, setFormValid] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    if (auth.loggedIn) {
      // update account
      // TODO
    } else {
      // create new account
      if (
        !formData.username ||
        !formData.password1 ||
        formData.password1 !== formData.password2 ||
        !formData.email.match(emailRegex)
      ) {
        console.log('Missing parameters for signup')
        return
      }
      const user = await services.userService.createUser(
        formData.username,
        formData.email,
        formData.password1
      )
      if (user) {
        history.push('/tesla-account', {})
      }
    }
  }

  useEffect(() => {
    // check passwords match
    const pv =
      (formData.password1 &&
        formData.password1.length > 9 &&
        formData.password1 === formData.password2) ||
      false
    // check form valid
    const fv =
      (pv &&
        formData.username &&
        formData.email &&
        emailRegex.test(formData.email)) ||
      false
    setFormValid(pv && fv)
  }, [
    formData.username,
    formData.email,
    formData.password1,
    formData.password2
  ])

  function resetForm() {
    // TODO: will have to handle existing users
  }

  return (
    <div className='centered narrow'>
      <h3>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Username'
          name='username'
          type='text'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          placeholder='Email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
        />
        {auth.loggedIn && (
          <input
            placeholder='Existing Password'
            name='authPassword'
            type='password'
            value={formData.authPassword}
            onChange={handleChange}
          />
        )}
        <input
          placeholder='Password'
          name='password1'
          type='password'
          value={formData.password1}
          onChange={handleChange}
        />
        <input
          placeholder='Verify Password'
          name='password2'
          type='password'
          value={formData.password2}
          onChange={handleChange}
        />
        <div>
          <button value='SUBMIT'
                  type='submit'
                  disabled={!formValid}>
            Submit
          </button>
          <button type='reset'
                  onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
