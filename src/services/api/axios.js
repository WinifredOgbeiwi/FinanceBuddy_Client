import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL_DEPLOY;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
