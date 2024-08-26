
import { LOAD_SPOTS, ADD_SPOT, UPDATE_SPOT, DELETE_SPOT } from './actionTypes';

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload: spots,
});

export const addSpot = (spot) => ({
  type: ADD_SPOT,
  payload: spot,
});

export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot,
});

export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  payload: spotId,
});
