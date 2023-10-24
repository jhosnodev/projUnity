import { useRouter } from "next/router";
import {
  ADD_ITEM,
  REMOVE_ALL,
  CHECKOUT,
  REMOVE_ITEM,
  GET_ALL_ITEMS,
  SET_ALERT,
  ENDPOINT,
} from "../types";

const axios = require("axios");

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
  localStorage.removeItem("carrito");
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
export const checkout = (items, userID) => {
  const check = items.map((item) => {
    return {
      buyer: userID.id,
      id: item.id,
      title: item.name,
      currency_id: "ARS",
      unit_price: Number(item.price),
      quantity: 1,
    };
  });
  console.log(check);
  return async (dispatch) => {
    try {
      const respuesta = await axios({
        method: "post",
        url: `${ENDPOINT}payment`,
        data: check,
      });
      console.log(respuesta.data.init_point);
      /*    removeAll(); */
      location.href = respuesta.data.init_point;
      /*   router.push(respuesta.init_point); */
      return dispatch({
        type: respuesta.statusText === "OK" ? CHECKOUT : "default",
        payload:
          respuesta.statusText === "OK"
            ? { type: "success", message: "Tu compra ha sido exitosa" }
            : { type: "error", message: "¡Algo falló!" },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
