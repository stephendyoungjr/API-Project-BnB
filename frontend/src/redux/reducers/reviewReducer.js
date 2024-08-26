
import { LOAD_REVIEWS, ADD_REVIEW, DELETE_REVIEW } from '../actions/actionTypes';

const initialState = [];

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return action.payload;
    case ADD_REVIEW:
      return [...state, action.payload];
    case DELETE_REVIEW:
      return state.filter(review => review.id !== action.payload);
    default:
      return state;
  }
};

export default reviewReducer;
