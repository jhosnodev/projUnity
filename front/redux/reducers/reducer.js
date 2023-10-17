import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import usersReducer from "./usersReducer";
import carritoReducer from "./carritoReducer";

export default combineReducers({
  projectsData: projectsReducer,
  carritoData: carritoReducer,
  usersData: usersReducer,
});
