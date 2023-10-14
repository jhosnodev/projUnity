import { GET_COMMENTS_BY_PROJECT, ADD_COMMENT } from "../types";
import axios from "axios";

/* const axios = require("axios"); */
const enpointLocal = "http://localhost:3001/";
/* const enpointLocal = "https://server-production-8832.up.railway.app/"; */


export const getCommentsByProject = () => {
  let cart = JSON.parse(localStorage.getItem("carrito"));
  return {
    type: GET_COMMENTS_BY_PROJECT,
    payload: cart,
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
