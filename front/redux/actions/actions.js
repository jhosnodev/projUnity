
export const GET_DETAIL = "GET_DETAIL";
import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  PROJECT_ERROR,
  SET_ALERT,
  // GET_DETAIL,
} from "../types";

// const enpointLocal = "http://localhost:3001/";
const enpointApiNext = "http://localhost:3000/api/";

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await fetch(`${enpointApiNext}projects`);
      return dispatch({ type: GET_ALL_PROJECTS, payload: data });
    } catch (error) {
      // return dispatch({
      //   type: SET_ALERT,
      //   payload: { type: "error", msg: error.message },
      // });
    }
  };
};
