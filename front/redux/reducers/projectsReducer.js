import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  PROJECT_ERROR,
  GET_DETAIL,
  SET_ALERT,
  GET_ALL_CATEGORIES,
  FILTER_CLEAR,
  FILTERS,
  ORDER_CATEGORIES,
  GET_PROJECTS_BY_NAME,
} from "../types";

const initialState = {
  projects: [],
  projectsFilter: [],
  categories: [],
  loading: true,
  test: {},
  alert: {},
  detail: [],
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        alert: action.payload,
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
        loading: false,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
        loading: false,
      };
    case GET_PROJECTS_BY_NAME:
      return {
        ...state,
        projects: action.payload,
        projectsFilter: action.payload,
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
      };

    //! seccion de filtros proyectos

    case FILTER_CLEAR:
      return {
        ...state,
        projectsFilter: state.projects,
      };
    case ORDER_CATEGORIES:
      return {
        ...state,
        projectsFilter: state.projects
          .filter((proj) =>
            action.payload === "all"
              ? true
              : action.payload === proj.Categories[0]?.name
          )
          .sort((a, b) => b.views - a.views),
      };
    case FILTERS:
      return {
        ...state,
        test: { ...action.payload },
        projectsFilter: state.projects.filter(
          (proj) =>
            (action.payload.category !== ""
              ? action.payload.category === proj?.Categories[0]?.name
              : true) &&
            (action.payload.price !== ""
              ? action.payload.price > 0
                ? action.payload.price > 1
                  ? parseInt(proj.price) <= action.payload.price &&
                    parseInt(proj.price) > 0
                  : parseInt(proj.price) > 0
                : proj.price === "0.00"
              : true) &&
            (action.payload.tags.length > 0
              ? action.payload.tags.filter((tag) =>
                  proj.Tags.map((tag) => tag.name).includes(tag)
                ).length > 0
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
