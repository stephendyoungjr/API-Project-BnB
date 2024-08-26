import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings/current');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data.Bookings);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (!user) {
    return <div>Please log in to view your bookings.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Your Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.Spot.name} from {booking.startDate} to {booking.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBookingsPage;
