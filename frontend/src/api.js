
import csrfFetch, { restoreCSRF } from './utils/api';  

export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-project-bnb.onrender.com/api' 
  : 'http://localhost:8000/api';

export const login = async (credential, password) => {
  const res = await csrfFetch(`${API_URL}/session`, {
    method: 'POST',
    body: JSON.stringify({ credential, password }),
  });

  return res.json();
};

export const signup = async (user) => {
  const res = await csrfFetch(`${API_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
  });

  return res.json();
};

export const createSpot = async (spotData) => {
  const res = await csrfFetch(`${API_URL}/spots`, {
    method: 'POST',
    body: JSON.stringify(spotData),
  });

  return res.json();
};

export const getSpots = async () => {
  const res = await csrfFetch(`${API_URL}/spots`);
  return res.json();
};
