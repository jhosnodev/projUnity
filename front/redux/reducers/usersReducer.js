import {
  GET_SESION,
  GET_USERS,
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
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
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
    case GET_SESION:
      return {
        ...state,
        sesion: action.payload,

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
