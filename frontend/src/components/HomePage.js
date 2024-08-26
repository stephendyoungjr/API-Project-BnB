import React from 'react';
import { Link } from 'react-router-dom';
import SpotList from './SpotList';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to WarBnB!</h1>
      <SpotList />
      <Link to="/spots">View All Spots</Link>
    </div>
  );
};

export default HomePage;
