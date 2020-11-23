import {instance} from "./instance";
import { SET_USER } from "./actionTypes";
import jwt_decode from "jwt-decode";

export const signup = (userData) => {
  return async (dispatch) => {
    try {
      // if(userData.password !== userData.repeatPassword){
      //   window.alert("Please enter the password again");
      // }
      const response = await instance.post("register", userData);
      dispatch(login(userData));
      console.log(response);
    } catch (error) {
      // const response = await instance.post("register", userData);
      // console.log("res", response);
      const error_mess = error.response.data.msg;
      console.error(error.response.data);
      console.log(error_mess);
      window.alert(error_mess);
    }
  };
};

export const login = (userData) => {
  return async (dispatch) => {
    try {
      const response = await instance.post("/login", userData);
      console.log("i am logging userdata", userData)

      // console.log(response.name);
console.log("res", response)
      const user = response.headers.token;
      console.log(user);
      dispatch(setCurrentUser(user));

    
    } catch (error) {
      console.error(error);
    }
  };
};

export const setCurrentUser = (token) => async (dispatch) => {
  
  let decodedUser = null;
  if (token) {
    decodedUser = jwt_decode(token);
  }
  setAuthToken(token);
  dispatch({
    type: SET_USER,
    payload: decodedUser,
  });
  
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete instance.defaults.headers.common.Authorization;
  }
};

export const checkExpiredToken = () => (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const currentTime = Date.now() / 1000;
      const decodedUser = jwt_decode(token);
      if (decodedUser.exp >= currentTime) {
        dispatch(setCurrentUser(token));
      } else {
        dispatch(logout());
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => {
  return setCurrentUser();
};
