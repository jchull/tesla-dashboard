import React from 'react';
import {AppState} from '../../type/state';
import {NavLink} from 'react-router-dom';
import {authenticationService} from '@service/Services';

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

        <NavLink to="/products">Products</NavLink>


        <NavLink to="/logout">Sign Out</NavLink>

      </div>
  );
};

