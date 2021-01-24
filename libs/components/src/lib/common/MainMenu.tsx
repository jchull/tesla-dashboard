import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './MainMenu.scss'
import { useHistory, useLocation } from 'react-router-dom'

interface MenuItem {
  name: string

  action(): void
}

export const MainMenu: React.FC = () => {
  const dispatch = useDispatch()
  const username = useSelector(
    (store: { auth: { username: string } }) => store.auth.username
  )
  const history = useHistory()
  const location = useLocation()

  const [showing, setShowing] = useState(false)

  const loggedInMenuItems: MenuItem[] = [
    {
      name: 'dashboard',
      action: () => history.push('/dashboard')
    },
    {
      name: 'settings',
      action: () => history.push('/preferences')
    },
    {
      name: 'account',
      action: () => history.push('/account')
    },
    {
      name: 'tesla account',
      action: () => history.push('/tesla-account')
    },
    {
      name: 'logout',
      action: () => history.push('/logout')
    }
  ]

  const loggedOutMenuItems = [
    {
      name: 'login',
      action: () => history.push('/login', location.state)
    },
    {
      name: 'about',
      action: () => console.log('dispatch navigation action')
    }
  ]

  function mapItemsToElements(items: MenuItem[]): JSX.Element[] {
    return items.map((item) => (
      <div key={item.name}
           onClick={() => item.action()}>
        {item.name}
      </div>
    ))
  }

  const content = username
    ? mapItemsToElements(loggedInMenuItems)
    : mapItemsToElements(loggedOutMenuItems)

  return (
    <div className='main-menu'
         onClick={() => setShowing(!showing)}>
      <div>
        <div className='username'>{username}</div>
        <i className='material-icons'>menu</i>
      </div>

      <div className={showing ? 'menu-items showing' : 'menu-items'}>
        {content}
      </div>
    </div>
  )
}
