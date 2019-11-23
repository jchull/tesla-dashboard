import React from 'react';
import {AppState} from '../../store/types/state';
import {NavLink} from 'react-router-dom';
import {authenticationService} from '@service/index.ts';

import './Home.scss';

export const Home: React.FC<AppState> = () => {


  return (
      <div className='home centered'>
        <h3>
          {authenticationService.getUsername()}
        </h3>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/tesla-account">Tesla Accounts</NavLink>
        <NavLink to="/preferences">Preferences</NavLink>
        <NavLink to="/sync-preferences">Sync Prefs</NavLink>

        <NavLink to="/products">Products</NavLink>


        <NavLink to="/logout">Sign Out</NavLink>

      </div>
  );
};

