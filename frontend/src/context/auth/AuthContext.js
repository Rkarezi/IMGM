import AuthReducer from "./AuthReducer";
import React, { createContext, useEffect, useReducer } from "react";
import { validToken } from "./AuthCall";
var validUser;
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  if (state.user == "user") {
    validUser = setInterval(() => {
      validToken(dispatch);
    }, 1500);
  } else {
    clearInterval(validUser);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
