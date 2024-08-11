import axios from "axios";
import qs from "qs";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const instance = axios.create({
  baseURL: "https://localhost:7050",
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false });
  },
});

instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    config.headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Nu seta "Content-Type" dacă cererea este multipart/form-data
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response;
    } else {
      if (messages) {
        if (messages instanceof Array) {
          return Promise.reject({ messages });
        }
        return Promise.reject({ messages: [messages] });
      }
      return Promise.reject({ messages: ["got errors"] });
    }
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      history.replace({ pathname: "/error" });
    } else if (error.response && error.response.status === 500) {
      return Promise.reject(error.response);
    } else return Promise.reject(error);
  }
);

export const http = instance;

export default http;
