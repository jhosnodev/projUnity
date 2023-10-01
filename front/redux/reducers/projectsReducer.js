import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  PROJECT_ERROR,
  GET_DETAIL,
  SET_ALERT,
} from "../actions/actions";


const initialState = {
  projects: [],
  loading: true,
  alert: {},
  detail:[],
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
    
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
};

export default projectsReducer;
