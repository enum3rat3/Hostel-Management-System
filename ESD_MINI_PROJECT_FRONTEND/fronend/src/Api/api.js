import axios from "axios";
// export const BASE_URL = window._env_.REACT_APP_API_URL;
export const BASE_URL = "http://api-gateway.local";

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  export const setAuthHeader = (token,api) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };