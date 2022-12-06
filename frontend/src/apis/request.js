import axios from "axios";
import {SERVER_URL} from "../configs/url";

const request = axios.create({
   baseURL: SERVER_URL,
  headers:{

    "Authorization": "Bearer " + localStorage.getItem("accessToken")
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

request.interceptors.request.use(
  async config => {
    config.headers = {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
      'Accept': 'application/json',
      "Content-Type": "application/json",
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

export default request;

