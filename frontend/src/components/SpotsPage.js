import React, { useEffect, useState } from 'react';
import SpotList from './SpotList';

const SpotsPage = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch('/api/spots');
        if (!response.ok) {
          throw new Error('Failed to fetch spots');
        }
        const data = await response.json();
        setSpots(data.Spots);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>List of Spots</h1>
      <SpotList spots={spots} />
    </div>
  );
};

export default SpotsPage;
