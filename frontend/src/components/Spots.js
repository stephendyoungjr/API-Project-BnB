import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../redux/actions/spotActions';

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div>
      {spots.map((spot) => (
        <div key={spot.id}>
          <h2>{spot.name}</h2>
          <p>{spot.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Spots;
