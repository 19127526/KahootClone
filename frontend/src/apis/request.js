import axios from "axios";

const request = axios.create({
  /* baseURL: "" */
});

request.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    return error;
  }
);

request.interceptors.request.use((index) => {
  return index;
});

export default request;
