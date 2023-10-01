import axios from "axios";
//export const GET_DETAIL = "GET_DETAIL";

import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  PROJECT_ERROR,
  GET_ALL_CATEGORIES,
  FILTERS,
  GET_DETAIL,
} from "../types";
/* const axios = require("axios"); */

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

export const getCategory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${enpointApiNext}categories`);
      return dispatch({ type: GET_ALL_CATEGORIES, payload: data.data });
    } catch (error) {
      /*       return dispatch({
        type: SET_ALERT,
        payload: { type: "error", msg: error.message },
      }); */
      console.log(error.message);
    }
  };
};

export const filters = (filters) => {
  return {
    type: FILTERS,
    payload: filters,
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
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
