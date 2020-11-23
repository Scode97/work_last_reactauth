import Axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  //get acess to the details of the store
  let { data } = await Axios.get("http://localhost:8017/order/items/");
  // let dataID, dataName;

  // getState().productList.products.map((x) => console.log(x));
  // const cart = useSelector((state) => state.cart);

  let item;
  // data.forEach(element => {
  //   console.log(productId)
  //   if (productId==element.id){
  // let  cart= getState().cart.cartItems;
  //     if(cart!=null){
  //     item=element;
  //     cart.push(item);
  //   }else{
  //     item=element;
  //     item.quantity=qty
  //   }
  // }
  // });
  data.forEach((element) => {
    if (element.id == productId) {
      item = element;
      item.quantity = qty;
    }
  });

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      data: item,
      // itemDescription: data.itemDescription,
      // itemPrice: data.itemPrice,
      // quantity: data.quantity,
      // prodList: data,
      product: productId,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
