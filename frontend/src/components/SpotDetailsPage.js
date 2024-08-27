import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../api';

const SpotDetailsPage = () => {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(`${API_URL}/spots/${spotId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch spot');
        }
        const data = await response.json();
        setSpot(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSpot();
  }, [spotId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{spot.name}</h1>
      <p>{spot.description}</p>
      <p>{spot.price} per night</p>
      <p>{spot.address}, {spot.city}, {spot.state}, {spot.country}</p>
    </div>
  );
};

export default SpotDetailsPage;
