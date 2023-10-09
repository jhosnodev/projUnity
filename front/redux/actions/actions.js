import axios from "axios";

import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  PROJECT_ERROR,
  GET_ALL_CATEGORIES,
  FILTERS,
  GET_DETAIL,
  ORDER_CATEGORIES,
  SET_ALERT,
  GET_PROJECTS_BY_NAME,
} from "../types";
const enpointLocal = "http://localhost:3001/";
const enpointApiNext = "http://localhost:3000/api/";
const enpointApiRailway = "https://server-production-8832.up.railway.app/";

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

export const orderCategories = (categories) => {
  return {
    type: ORDER_CATEGORIES,
    payload: categories,
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${enpointApiRailway}projects/${id}`);
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

export const addProjects = (data) => {
  return async (dispatch) => {
    try {
      const respuesta = await axios({
        method: "post",
        url: `${enpointApiNext}projects/`,
        data: data,
      });
      console.log(respuesta);
      return dispatch({
        type: SET_ALERT,
        payload: respuesta,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProjectByName = (name) => {
  const endpoint = `${enpointApiNext}projects?name=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      dispatch({ type: GET_PROJECTS_BY_NAME, payload: data });
    } catch (error) {
      alert("Proyecto no encontrado");
    }
  };
};

export const createUser = (data) => {
  return async (dispatch) => {
    try {
      const respuesta = await axios({
        method: "post",
        url: `${enpointLocal}sign-up`,
        data: data,
      });
      console.log(respuesta);
      return dispatch({
        type: SET_ALERT,
        payload: respuesta,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

/* export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${enpointLocal}auth/login`, {email, password});
    if (response.data.success) {
      dispatch ({type: "LOGIN_SUCCESS" });
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
  }
}; */
