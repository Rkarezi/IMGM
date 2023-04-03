import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logout } from "./AuthAction";

export const login = (dispatch) => {
  dispatch(loginStart());
  try {
    axios.get("http://localhost:8081/isLogged").then((resp) => {
      dispatch(loginSuccess(resp.data));
    });
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoff = async (dispatch) => {
  axios.get("http://localhost:8081/logout").then(() => {
    dispatch(logout());
  });
};

export const validToken = (dispatch) => {
  axios.get("http://localhost:8081/isValid").then((resp) => {
    if (resp.data == "refreshed_token") {
      setTimeout(() => {
        dispatch(logout());
        axios.get("http://localhost:8081/logout");
      }, 3600 * 1000);
    }
  });
};
