import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  PROJECT_ERROR,
  SET_ALERT,
} from "../types";

const initialState = {
  projects: [],
  loading: true,
  alert: {},
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case GET_ALL_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };

    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };

    default:
      return state;
  }
};

export default projectsReducer;
