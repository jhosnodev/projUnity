import axios from "axios"
export const GET_DETAIL = "GET_DETAIL";
import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  PROJECT_ERROR,
  // GET_DETAIL,
} from "../types";

const enpointLocal = "http://localhost:3001/";
const enpointApiNext = "http://localhost:3000/api/";

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await fetch(`${enpointApiNext}projects`);
      return dispatch({ type: GET_ALL_PROJECTS, payload: data });
    } catch (error) {
      return dispatch({
        type: SET_ALERT,
        payload: { type: "error", msg: error.message },
      });
    }
  };
};

export const getDetail = (id) => {
 
  return async (dispatch) => {
    try {
      const {data} = await axios(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      )
    // console.log(data);
      return dispatch({
        type: GET_DETAIL,
        payload: data,
      });
    } catch (error) {
      // return dispatch({
      //   type: SET_ALERT,
      //   payload: { type: "error", msg: error.message },
      // });
    }
  };
};
