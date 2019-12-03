import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '@store/store';
import './MainMenu.scss';
import {logoutAction} from '../../auth/actions';

interface MenuItem {
  name: string,

  action(): any
}

export const MainMenu: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector((store: AppState) => store.auth.username);

  const [showing, setShowing] = useState(false);

  const loggedInMenuItems: MenuItem[] = [
    {
      name: 'dashboard',
      action: () => console.log('dispatch navigation action')
    },
    {
      name: 'settings',
      action: () => console.log('dispatch navigation action')
    },
    {
      name: 'logout',
      action: () => dispatch(logoutAction())
    }];

  const loggedOutMenuItems = [{
    name: 'login',
    action: () => console.log('should go to login')
  }, {
    name: 'about',
    action: () => console.log('dispatch navigation action')
  }];

  function mapItemsToElements(items: MenuItem[]): JSX.Element[] {
    return items.map((item) => <div key={item.name}
                                    onClick={() => item.action()}>
      {item.name}
    </div>);
  }

  const content = username ?
                  mapItemsToElements(loggedInMenuItems)
                           :
                  mapItemsToElements(loggedOutMenuItems);

  return (
      <div className="main-menu"
           onClick={() => setShowing(!showing)}>
        <div>
          <div className="username">
            {username}
          </div>
          <i className="material-icons">menu</i>
        </div>

        <div className={showing ? 'menu-items showing' : 'menu-items'}>
          {content}
        </div>
      </div>
  );
};

