import { GET_ORDER } from "../types";

const initialState = {
  payments: [],
  loading: true,
};
 
 const paymentReducer = (state = initialState, action) => {
   switch (action.type) {
     case GET_ORDER:
       return {
         ...state,
         payments: action.payload,
         loading: false,
       };
     default:
       return state;
   }
 };

 export default paymentReducer;