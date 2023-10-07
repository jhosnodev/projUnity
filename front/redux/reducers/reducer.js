import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import carritoReducer from "./carritoReducer";



export default combineReducers({
  projectsData: projectsReducer,
  carritoData: carritoReducer,
});
