import {
 GET_USER_BY_ID,
} from "../types";

const initialState = {
  users: [],
  userId: [],
  loading: true,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    
      case GET_USER_BY_ID:
      return {
        ...state,
        userId: action.payload,
        loading: false,
      };
   
    default:
      return state;
  }
};

export default usersReducer;
