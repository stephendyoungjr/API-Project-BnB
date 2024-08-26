import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <NavLink exact="true" to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/spots" activeClassName="active">
        Spots
      </NavLink>
      {user ? (
        <>
          <NavLink to="/profile" activeClassName="active">
            Profile
          </NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/signup" activeClassName="active">
            Signup
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
