
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(1);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, stars }),
      });
      if (!response.ok) throw new Error('Failed to submit review');
      navigate(`/spots/${spotId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review"
        required
      />
      <input
        type="number"
        value={stars}
        onChange={(e) => setStars(e.target.value)}
        min="1"
        max="5"
        required
      />
      {error && <div>Error: {error}</div>}
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
