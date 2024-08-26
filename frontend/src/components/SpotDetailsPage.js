
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SpotDetails = () => {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    const fetchSpot = async () => {
      const response = await fetch(`/api/spots/${spotId}`);
      const data = await response.json();
      setSpot(data);
    };

    fetchSpot();
  }, [spotId]);

  if (!spot) {
    return <div>Loading...</div>;
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

export default SpotDetails;
