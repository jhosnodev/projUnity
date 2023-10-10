import axios from "axios";

import { GET_USER_BY_ID, GET_USER_BY_NAME, LOGIN, LOGOUT } from "../types";

const enpointLocal = "http://localhost:3001/";
const enpointApiNext = "http://localhost:3000/api/";

export const getUserId = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        `https://api.escuelajs.co/api/v1/users/${id}`
      );
      console.log(response);
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
    try {
      const response = await axios.get(`${enpointLocal}logout`);
      localStorage.removeItem('sesion');
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
