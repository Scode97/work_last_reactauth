import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { productListReducer } from "./reducers/productReducers";
import { checkExpiredToken } from "./actions/authActions";
import authReducer from "./reducers/authReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";

const initialState = {
  cart: {
    cartItems:
      localStorage.getItem("cartItems") != null
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  rootAuth: authReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,

  //   productDetails: productDetailsReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
store.dispatch(checkExpiredToken());
export default store;
