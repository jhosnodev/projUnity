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
  LOGIN,
  GET_PREMIUM_PROJECT
} from "../types";
/* const enpointLocal = "http://localhost:3001/"; */
const enpointLocal = "https://projunity-production.up.railway.app/";
const enpointApiNext = "http://localhost:3000/api/";

const enpointApiRailway = "https://projunity-production.up.railway.app";


export const getProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${enpointApiRailway}projects`);
      console.log(`${enpointApiRailway}projects`);
      return dispatch({ type: GET_ALL_PROJECTS, payload: data });
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
      const { data } = await axios(`${enpointApiRailway}categories`);
      return dispatch({ type: GET_ALL_CATEGORIES, payload: data });
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
        url: `${enpointApiRailway}projects/`,
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
  const endpoint = `${enpointApiRailway}projects?name=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      dispatch({ type: GET_PROJECTS_BY_NAME, payload: data });
    } catch (error) {
      alert("Proyecto no encontrado");
    }
  };
};
export const getPremiumsProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${enpointLocal}projects`);
      console.log(`${enpointLocal}projects`);
      return dispatch({ type: GET_PREMIUM_PROJECT, payload: data });
    } catch (error) {
      /*       return dispatch({
        type: SET_ALERT,
        payload: { type: "error", msg: error.message },
      }); */
      console.log(error.message);
    }
  };
};

export const createUser = (data) => {
  return async (dispatch) => {
    try {
      const respuesta = await axios({
        method: "post",
        url: `${enpointApiRailway}sign-up`,
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

export const loginUser = (login) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(`${enpointApiRailway}login`, login);
      if (data.access) {
        localStorage.setItem("sesion", JSON.stringify(data));
        dispatch({
          type: LOGIN,
          payload: {
            data: data,
            alert: { type: "success", msg: "Inicio de sesion exitoso!" },
          },
        });

      } else {
        dispatch({
          type: SET_ALERT,
          payload: { type: "error", msg: "Revisa tus credenciales" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
