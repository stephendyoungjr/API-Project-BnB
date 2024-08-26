
import { LOAD_REVIEWS, ADD_REVIEW, DELETE_REVIEW } from './actionTypes';

export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  payload: reviews,
});

export const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId,
});
