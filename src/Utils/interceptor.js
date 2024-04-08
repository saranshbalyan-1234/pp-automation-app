import axios from "axios";
import { store } from "../Redux/store";
import { message } from "antd";
import { logout } from "../Redux/Actions/auth";

// eslint-disable-next-line
export default {
  setup: () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    function getJWT() {
      let token = store.getState().auth.user?.accessToken;
      return token;
    }
    function getCurrentProjectId() {
      let currentProjectId = store.getState().projects.currentProject?.id;
      return currentProjectId;
    }
    axios.interceptors.request.use((req) => {
      if (req.url.includes("auth") || req.url.includes("jwt")) {
        //No Authorization token
      } else {
        req.headers.Authorization = `Bearer ${getJWT()}`;
        req.headers["x-project-id"] = getCurrentProjectId();
      }
      return req;
    });

    axios.interceptors.response.use(
      (res) => {
        res.data.message && message.success(res.data.message);
        return res;
      },
      (err) => {
        let status = err.response.status;
        if (status === 403) {
          store.dispatch(logout());
        }
        const errorObj =  err.response?.data;
          console.error("errorResponse", errorObj);
          message.error(errorObj?.error || "Internal Server Error!");

        return Promise.reject(err.response.data);
      }
    );
  },
};
