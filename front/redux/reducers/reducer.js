import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  projectsData: projectsReducer,
  usersData: usersReducer
});
