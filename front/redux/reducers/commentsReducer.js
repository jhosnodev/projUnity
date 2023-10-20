import { ADD_COMMENT, GET_ALL_COMMENTS, GET_COMMENTS_BY_PROJECT } from "../types";

const initialState = {
  commentsByProject: [],
  loading: true,
  alert: {},
  comments: []
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
    case GET_ALL_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default commentsReducer;
