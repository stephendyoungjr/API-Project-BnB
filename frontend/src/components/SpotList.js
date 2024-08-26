
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SpotList = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const fetchSpots = async () => {
      const response = await fetch('/api/spots');
      const data = await response.json();
      setSpots(data.Spots);
    };

    fetchSpots();
  }, []);

  return (
    <div>
      <h1>All Spots</h1>
      <ul>
        {spots.map(spot => (
          <li key={spot.id}>
            <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotList;