
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import SpotsPage from './components/SpotsPage';
import SpotDetailsPage from './components/SpotDetailsPage';
import CreateSpotPage from './components/CreateSpotPage';
import UserBookingsPage from './components/UserBookingsPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/spots" component={SpotsPage} />
        <Route path="/spots/new" component={CreateSpotPage} />
        <Route path="/spots/:spotId" component={SpotDetailsPage} />
        <Route path="/bookings" component={UserBookingsPage} />
        {/* Additional roots here */}
      </Switch>
    </Router>
  );
}

export default App;
