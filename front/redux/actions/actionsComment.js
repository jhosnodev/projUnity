import { GET_COMMENTS_BY_PROJECT, ADD_COMMENT, GET_ALL_COMMENTS } from "../types";
import axios from "axios";

/* const axios = require("axios"); */
/* const enpointLocal = "http://localhost:3001/"; */
const enpointLocal = "https://projunity-production.up.railway.app/";


export const getCommentsByProject = () => {
  let cart = JSON.parse(localStorage.getItem("carrito"));
  console.log(cart);
  return {
    type: GET_COMMENTS_BY_PROJECT,
    payload: cart,
  };
};

export const getAllComments = () => {
 return async (dispatch) => {
    try {
      const { data } = await axios(`${enpointLocal}comments`);
      console.log(data);
     return dispatch({ type: GET_ALL_COMMENTS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createComment = (data) => {
  return async (dispatch) => {


    try {
      const respuesta = await axios({
        method: "post",
        url: `${enpointLocal}comments`,
        data: data,
      });
      console.log(respuesta);
      return dispatch({
        type: ADD_COMMENT,
        payload: respuesta,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
