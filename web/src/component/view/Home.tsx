import React from 'react';
import {NavLink} from 'react-router-dom';

export const Home: React.FC = () => {

  return (
      <div className='home centered'>
        <NavLink to="/login">Sign In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
  );
};

