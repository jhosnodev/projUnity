import {
  ADD_ITEM,
  REMOVE_ALL,
  CHECKOUT,
  REMOVE_ITEM,
  GET_ALL_ITEMS,
  SET_ALERT,
} from "../types";

/* const axios = require("axios"); */

const enpointLocal = "http://localhost:3001/";
const enpointApiNext = "http://localhost:3000/api/";

export const getAllitems = () => {
  let cart = JSON.parse(localStorage.getItem("carrito"));
  return {
    type: GET_ALL_ITEMS,
    payload: cart,
  };
};

export const addItem = (item) => {
  return (dispatch) => {
    //  const [orderData, setOrderData] = useState({ quantity: "1", price: "10", amount: 10, description: "Some book" });
    if (typeof Storage !== "undefined" && localStorage.carrito) {
      let cart = JSON.parse(localStorage.getItem("carrito"));
      //aqui deberia validar que no este repetido, si esta repetido mandar un alert
      const filter = cart.filter((element) => element.id === item.id);
      if (filter.length > 0) {
        return {
          type: SET_ALERT,
          payload: {
            type: "error",
            msg: `¡${item.name} ya esta agregado a tu carrito!`,
          },
        };
      } else {
        localStorage.setItem("carrito", JSON.stringify([...cart, item]));
        return {
          type: ADD_ITEM,
          payload: {
            item,
            alert: {
              type: "success",
              msg: `¡${item.name} agregado la carrito!`,
            },
          },
        };
      }
    } else {
      // Código cuando Storage NO es compatible
    }
  };
};

export const removeAll = () => {
  localStorage.clear();
  return {
    type: REMOVE_ALL,
  };
};
export const removeItem = (item) => {};
export const checkout = () => {};
