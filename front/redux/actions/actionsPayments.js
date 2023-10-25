import axios from "axios";

import { GET_ORDER, ENDPOINT } from "../types";

const endpoint = ENDPOINT;

export const getOrder = () => {
  return async (dispatch) => {
    try {
      const response = await axios(`${endpoint}payment`);
      console.log(response.data);
      return dispatch({
        type: GET_ORDER,
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
