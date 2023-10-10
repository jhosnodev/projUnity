import {
  GET_USER_BY_ID,
  GET_USER_BY_NAME,
  LOGIN,
  LOGOUT,
  SET_ALERT,
} from "../types";

const initialState = {
  users: [],
  userId: [],
  loading: true,
  sesion: {},
  alert: {},
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return {
        ...state,
        userId: action.payload,
        loading: false,
      };
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case LOGIN:
      
      return {
        ...state,
        sesion: action.payload.data,
        alert: action.payload.alert,
      };
    case LOGOUT:
      return {
        ...state,
        sesion: {},
        alert: action.payload,
      };

    default:
      return state;
  }
};

export default usersReducer;
