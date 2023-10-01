import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  PROJECT_ERROR,
  GET_DETAIL,
  SET_ALERT,
  GET_ALL_CATEGORIES,
  FILTER_CATEGORY,
  FILTER_PRICE,
  FILTER_TAGS,
  FILTER_CLEAR,
  FILTERS,
} from "../types";


const initialState = {
  projects: [],
  projectsFilter: [],
  categories: [],
  loading: true,
  test: {},
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
        projectsFilter: action.payload,
        loading: false,
      };

    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    //! seccion de filtros proyectos

    case FILTER_CLEAR:
      return {
        ...state,
        projectsFilter: state.projects,
      };
    case FILTERS:
      return {
        ...state,
        test: { ...action.payload },
        projectsFilter: state.projects.filter(
          (proj) =>
            (action.payload.category !== ""
              ? action.payload.category === proj.category
              : true) &&
            (action.payload.price !== ""
              ? action.payload.price > 0
                ? action.payload.price > 1
                  ? parseInt(proj.price) <= action.payload.price &&
                    parseInt(proj.price) > 0
                  :  parseInt(proj.price) > 0
                : proj.price === 'free'
              : true) &&
            (action.payload.tags.length > 0
              ? action.payload.tags.filter((tag) => proj.tags.includes(tag))
                  .length > 0
                ? true
                : false
              : true)
        ),
      };
    default:
      return state;
  }
};

export default projectsReducer;
