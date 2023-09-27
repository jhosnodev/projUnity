import { ADD_PROJECT, GET_ALL_PROJECTS, PROJECT_ERROR } from "../types";

const initialState = {
  projects: [],
  loading: true,
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

    case PROJECT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default projectsReducer;
