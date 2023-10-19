import { ADD_COMMENT, GET_COMMENTS_BY_PROJECT } from "../types";

const initialState = {
  commentsByProject: [],
  loading: true,
  alert: {},
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_BY_PROJECT:
      return {
        ...state,
        carrito: action.payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        alert: action.payload.alert,
      };

    default:
      return state;
  }
};
export default commentsReducer;
