import axios from "axios";
export const axiosInstance = axios.create({
  // baseURL: "http://192.168.80.239/v1/",
  // baseURL: "http://192.168.80.129:5115/v1/",
  // baseURL: "http://192.168.80.167:5009/v1/",
  // baseURL: "http://192.168.80.246/v1/",
  // baseURL: "http://192.168.80.251/v1/",
  // baseURL: "http://192.168.80.181/v1/",
  baseURL: "http://192.168.80.179/v1/",
  timeout: 10000,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
