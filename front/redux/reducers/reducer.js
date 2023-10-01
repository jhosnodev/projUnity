import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";

export default combineReducers({
  projectsData: projectsReducer,
});
