// api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3234", // Adjust the baseURL to your API server
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
