
import { createAction } from '@reduxjs/toolkit';

export const setUser = createAction('SET_USER');
export const removeUser = createAction('REMOVE_USER');


export const logout = () => (dispatch) => {

  localStorage.removeItem('userToken'); 
  sessionStorage.removeItem('userSession'); 


  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


  dispatch(removeUser());
};
