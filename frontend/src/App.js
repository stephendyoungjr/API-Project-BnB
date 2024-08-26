
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SpotDetails from './components/SpotDetails';
import UserProfile from './components/UserProfile';
import Navigation from './components/Navigation';
import ReviewForm from './components/ReviewForm';
import BookingForm from './components/BookingForm';
import EditReviewForm from './components/EditReviewForm';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/spots/:spotId" element={<SpotDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/spots/:spotId/reviews/new" element={<ReviewForm />} />
        <Route path="/spots/:spotId/bookings/new" element={<BookingForm />} />
        <Route path="/reviews/:reviewId/edit" element={<EditReviewForm />} />
      </Routes>
    </Router>
  );
}

export default App;
