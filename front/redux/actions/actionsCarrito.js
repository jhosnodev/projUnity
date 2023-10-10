import {
  ADD_ITEM,
  REMOVE_ALL,
  CHECKOUT,
  REMOVE_ITEM,
  GET_ALL_ITEMS,
  SET_ALERT,
  
} from "../types";

/* const axios = require("axios"); */

export const getAllitems = () => {
  let cart = JSON.parse(localStorage.getItem("carrito"));
  return {
    type: GET_ALL_ITEMS,
    payload: cart,
  };
};

export const addItem = (item) => {
  const cart = JSON.parse(localStorage.getItem("carrito"));

  if (cart) {
    if (cart.filter((element) => element.id === item.id).length > 0) {
      const alert = {
        type: "error",
        msg: `¡${item.name} ya esta agregado a tu carrito!`,
      };
      return alert;
    } else {
      localStorage.setItem("carrito", JSON.stringify([...cart, item]));
      const alert = {
        type: "success",
        msg: `¡${item.name} agregado la carrito!`,
      };
      return alert;
    }
  } else {
    localStorage.setItem("carrito", JSON.stringify([item]));
    const alert = {
      type: "success",
      msg: `¡${item.name} agregado la carrito!`,
    };
    return alert;
  }
};

export const removeAll = () => {
  localStorage.clear();
  return {
    type: REMOVE_ALL,
    payload: [],
  };
};
export const removeItem = (id) => {
  const cart = JSON.parse(localStorage.getItem("carrito"));

  localStorage.setItem(
    "carrito",
    JSON.stringify([...cart.filter((element) => element.id !== id)])
  );
};
export const checkout = () => {};
