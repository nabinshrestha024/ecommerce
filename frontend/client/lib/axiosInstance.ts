import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://192.168.80.229:80/v1/",
  timeout: 10000,
});
