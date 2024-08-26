
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate }),
      });
      if (!response.ok) throw new Error('Failed to create booking');
      navigate(`/spots/${spotId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      {error && <div>Error: {error}</div>}
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
