
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditReviewForm = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState('');
  const [stars, setStars] = useState(1);
  const [spotId, setSpotId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/reviews/${reviewId}`);
        if (!response.ok) throw new Error('Failed to fetch review');
        const data = await response.json();
        setReview(data.review);
        setStars(data.stars);
        setSpotId(data.spotId);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchReview();
  }, [reviewId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, stars }),
      });
      if (!response.ok) throw new Error('Failed to update review');
      navigate(`/spots/${spotId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Edit your review"
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
      <button type="submit">Update Review</button>
    </form>
  );
};

export default EditReviewForm;
