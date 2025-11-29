import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export const API_URL = {
  login: { api: "/api/login", queryKey: "login" },
  logout: { api: "/api/logout", queryKey: "logout" },
  updateUsername: { api: "/api/update-username", queryKey: "update-username" },
  userInfo: { api: "/api/user-info", queryKey: "user-info" },
};
