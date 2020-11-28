import { instanceOrder } from "./instance";
import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async () => {
  console.log("coming from create order", order);

  console.log(order);
  try {
    const token = localStorage.getItem("token");
    console.log(token, "tok");
    const response = await instanceOrder.post("/order", order, {
      headers: {
        token: `${token}`,
      },
    });
    console.log("i am logging order", order, response);
  } catch (error) {
    console.log("now here", error.response.data);
    console.error(error);
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });

  try {
    const token = localStorage.getItem("token");
    const { data } = await instanceOrder.get(`/order/order_items/${orderId}`, {
      headers: {
        token: `${token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};
