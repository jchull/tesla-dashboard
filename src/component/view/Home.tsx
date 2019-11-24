import React from 'react';
import {NavLink} from 'react-router-dom';
import {authenticationService} from '@service/index.ts';

export const Home: React.FC = () => {

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

