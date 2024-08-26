// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import spotReducer from './reducers/spotReducer';
import reviewReducer from './reducers/reviewReducer';
import bookingReducer from './reducers/bookingReducer';
import spotImageReducer from './reducers/spotImageReducer';


const store = configureStore({
    reducer: {
        user: userReducer,
        spots: spotReducer,
        reviews: reviewReducer,
        bookings: bookingReducer,
        spotImages: spotImageReducer,

 
    },
    devTools: process.env.NODE_ENV !== 'production',  
});

export default store;
