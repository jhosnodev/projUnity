import { ADD_PROJECT, GET_ALL_PROJECTS, PROJECT_ERROR } from "../types";
const axios = require('axios');

const enpointLocal = "http://localhost:3001/";
const enpointApiNext = "http://localhost:3000/api/";

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${enpointApiNext}projects`);
      return dispatch({ type: GET_ALL_PROJECTS, payload: data.data });
    } catch (error) {
/*       return dispatch({
        type: SET_ALERT,
        payload: { type: "error", msg: error.message },
      }); */
      console.log(error.message);
    }
  };
};
