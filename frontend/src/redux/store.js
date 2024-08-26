
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


import userReducer from './reducers/userReducer';
import spotReducer from './reducers/spotReducer';
import bookingReducer from './reducers/bookingReducer';
import reviewReducer from './reducers/reviewReducer';
import spotImageReducer from './reducers/spotImageReducer';

const rootReducer = combineReducers({
    user: userReducer,
    spots: spotReducer,
    bookings: bookingReducer,
    reviews: reviewReducer,
    spotImages: spotImageReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
