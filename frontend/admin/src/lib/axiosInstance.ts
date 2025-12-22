import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "http://192.168.80.229/v1/",
  timeout: 10000,
});
