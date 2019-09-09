import React, {FC, useEffect} from 'react';
import {authenticationService} from '@service/Services';
import {NavLink} from 'react-router-dom';


export const LogoutComponent: FC = () => {

  useEffect(() => {
    authenticationService.logout();
  });

  return (
      <div>
        <div className="login">
          <h2>You are logged out</h2>
          <NavLink to="/login">Log in again</NavLink>
        </div>
      </div>
  );
};

