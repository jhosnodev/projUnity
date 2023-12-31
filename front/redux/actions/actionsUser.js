import axios from "axios";

import {
  GET_USER_BY_ID,
  GET_USER_BY_NAME,
  LOGIN,
  LOGOUT,
  GET_SESION,
  ENDPOINT,
  SET_ALERT
} from "../types";

const endpoint = ENDPOINT;

export const getUserId = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        `https://api.escuelajs.co/api/v1/users/${id}`
      );

      return dispatch({
        type: GET_USER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      // return dispatch({
      //   type: SET_ALERT,
      //   payload: { type: "error", msg: error.message },
      // });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("sesion");

    try {
      const response = await axios.get(`${endpoint}logout`);
      localStorage.removeItem("sesion");
      return dispatch({
        type: LOGOUT,
        payload: { type: "success" },
      });
    } catch (error) {
      return dispatch({
        type: SET_ALERT,
        payload: { type: "error", msg: error.message },
      });
    }
  };
};

export const getSesion = () => {
  let sesion = JSON.parse(localStorage.getItem("sesion"));
  return {
    type: GET_SESION,
    payload: sesion,
  };
};
