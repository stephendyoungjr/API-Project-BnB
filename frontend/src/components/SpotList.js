import React, { useEffect, useState } from 'react';
import { API_URL } from '../api';

const SpotList = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch(`${API_URL}/spots`);
        if (!response.ok) {
          throw new Error('Failed to fetch spots');
        }
        const data = await response.json();
        setSpots(data.Spots);
      } catch (error) {
        console.error('Error fetching spots:', error.message);
      }
    };

    fetchSpots();
  }, []);

  return (
    <div>
      <h1>All Spots</h1>
      <ul>
        {spots.map((spot) => (
          <li key={spot.id}>
            <a href={`/spots/${spot.id}`}>{spot.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotList;
