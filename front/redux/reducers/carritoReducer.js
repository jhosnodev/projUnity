import {
  ADD_ITEM,
  REMOVE_ALL,
  CHECKOUT,
  REMOVE_ITEM,
  GET_ALL_ITEMS,
  SET_ALERT,
} from "../types";

const initialState = {
  carrito: [],
  loading: true,
  alert: "",
};

const carritoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {
        ...state,
        carrito: action.payload,
        loading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        alert: action.payload.alert,
        carrito: [...state.carrito, action.payload.item],
        loading: false,
      };
    case REMOVE_ALL:
      return {
        ...state,
        carrito: [],

        loading: false,
      };
    case SET_ALERT:
      return {
        ...state,

        alert: action.payload,
      };
    default:
      return state;
  }
};
export default carritoReducer;
