import { createAction } from '@reduxjs/toolkit';

export const setSpots = createAction('SET_SPOTS');
export const addSpot = createAction('ADD_SPOT');
export const updateSpot = createAction('UPDATE_SPOT');
export const deleteSpot = createAction('DELETE_SPOT');
