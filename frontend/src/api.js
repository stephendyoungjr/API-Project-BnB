import csrfFetch, { restoreCSRF } from './utils/api';  

// Determine the API URL based on the environment (development or production)
export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-project-bnb.onrender.com/api' 
  : 'http://localhost:8000/api';

// Function to log in a user
export const login = async (credential, password) => {
  const res = await csrfFetch(`${API_URL}/session`, {
    method: 'POST',
    body: JSON.stringify({ credential, password }),
  });

  return res.json();
};

// Function to sign up a new user
export const signup = async (user) => {
  const res = await csrfFetch(`${API_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
  });

  return res.json();
};

// Function to create a new spot
export const createSpot = async (spotData) => {
  const res = await csrfFetch(`${API_URL}/spots`, {
    method: 'POST',
    body: JSON.stringify(spotData),
  });

  return res.json();
};

// Function to get all spots
export const getSpots = async () => {
  const res = await csrfFetch(`${API_URL}/spots`);
  return res.json();
};
