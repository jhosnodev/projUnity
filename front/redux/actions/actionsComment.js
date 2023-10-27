import { GET_COMMENTS_BY_PROJECT, ADD_COMMENT, ENDPOINT, GET_COMMENTS_TO_DETAIL} from "../types";
import axios from "axios";

const endpoint = ENDPOINT;

export const getAllComments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${endpoint}comments`);
      console.log(data);
      return dispatch({ type: GET_ALL_COMMENTS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getCommentsToDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${endpoint}projects/${id}`);
      // console.log(data);
      return dispatch({
        type: GET_COMMENTS_TO_DETAIL,
        payload: data.Comments,
      });
    } catch (error) {
      // return dispatch({
      //   type: SET_ALERT,
      //   payload: { type: "error", msg: error.message },
      // });
    }
  };
};

export const createComment = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      const respuesta = await axios({
        method: "post",
        url: `${endpoint}comments`,
        data: data,
      });
      console.log(respuesta);
      getCommentsToDetail(data.user);
      return dispatch({
        type: ADD_COMMENT,
        payload: respuesta,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
