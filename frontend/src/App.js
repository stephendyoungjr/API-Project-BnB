// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SpotDetails from './components/SpotDetails';
import UserProfile from './components/UserProfile';
import Navigation from './components/Navigation';
import SpotList from './components/SpotList';
import SpotForm from './components/SpotForm';
import ReviewForm from './components/ReviewForm';
import BookingForm from './components/BookingForm';
import EditSpotForm from './components/EditSpotForm';
import EditReviewForm from './components/EditReviewForm';
import UserBookings from './components/UserBookings';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/spots" component={SpotList} />
        <Route exact path="/spots/new" component={SpotForm} />
        <Route exact path="/spots/:spotId" component={SpotDetails} />
        <Route exact path="/spots/:spotId/edit" component={EditSpotForm} />
        <Route exact path="/spots/:spotId/reviews/new" component={ReviewForm} />
        <Route exact path="/spots/:spotId/bookings/new" component={BookingForm} />
        <Route exact path="/reviews/:reviewId/edit" component={EditReviewForm} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/profile/bookings" component={UserBookings} />
      </Switch>
    </Router>
  );
}

export default App;
