import axios from "axios";
import {SERVER_URL} from "../configs/url";

const request = axios.create({
   baseURL: SERVER_URL,
  headers:{
    "Content-Type": "application/json",
  }
});

request.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if(error.response.status===404){
      return error.response;
    }
    return error;
  }
);

request.interceptors.request.use((index) => {
  return index;
});

export default request;
