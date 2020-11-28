import axios from "axios";

const instance = axios.create({
  // baseURL: "http://authservice:8000/auth/"
  baseURL: "http://localhost:8000/auth/",
});

const instanceOrder = axios.create({
  baseURL: "http://localhost:8017/order/",
});

export { instance, instanceOrder };
