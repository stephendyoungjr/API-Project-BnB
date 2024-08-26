
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/spots">Spots</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
};

export default Navigation;
