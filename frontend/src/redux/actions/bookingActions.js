import { createAction } from '@reduxjs/toolkit';

export const setBookings = createAction('SET_BOOKINGS');
export const addBooking = createAction('ADD_BOOKING');
export const updateBooking = createAction('UPDATE_BOOKING');
export const deleteBooking = createAction('DELETE_BOOKING');
