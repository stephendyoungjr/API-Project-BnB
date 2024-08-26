
import { LOAD_BOOKINGS, ADD_BOOKING, DELETE_BOOKING } from '../actions/actionTypes';

const initialState = [];

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS:
      return action.payload;
    case ADD_BOOKING:
      return [...state, action.payload];
    case DELETE_BOOKING:
      return state.filter(booking => booking.id !== action.payload);
    default:
      return state;
  }
};

export default bookingReducer;
