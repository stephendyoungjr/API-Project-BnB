import { createAction } from '@reduxjs/toolkit';

export const setReviews = createAction('SET_REVIEWS');
export const addReview = createAction('ADD_REVIEW');
export const deleteReview = createAction('DELETE_REVIEW');
