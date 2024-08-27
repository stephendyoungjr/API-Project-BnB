import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import spotReducer from './reducers/spotReducer';
import reviewReducer from './reducers/reviewReducer';
import bookingReducer from './reducers/bookingReducer';
import spotImageReducer from './reducers/spotImageReducer';
import sessionReducer from './sessionSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer,
    spots: spotReducer,
    reviews: reviewReducer,
    bookings: bookingReducer,
    spotImages: spotImageReducer,
    session: sessionReducer,  
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
