import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  PROJECT_ERROR,
  SET_ALERT,
  GET_ALL_CATEGORIES  
} from "../types";

const initialState = {
  projects: [],
  categories: [],
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

    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default projectsReducer;
