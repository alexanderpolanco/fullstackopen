import { createSlice } from "@reduxjs/toolkit";
import {
  showNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import postLogin from "../services/login";

const sessionSlice = createSlice({
  name: "session",
  initialState: null,
  reducers: {
    setSession(state, action) {
      return action.payload;
    },
    deleteSession() {
      return null;
    },
  },
});

export const { setSession, deleteSession } = sessionSlice.actions;

export const login = ({ username, password }) => {
  return async (dispatch) => {
    const response = await postLogin(username, password);

    if ("error" in response) {
      dispatch(
        showNotification(
          { description: "wrong username or password", type: "error" },
          5,
        ),
      );
    } else {
      const { data } = response;
      const dataSession = {
        username: data.username,
        token: data.token,
      };
      dispatch(setSession(dataSession));
      localStorage.setItem("session", JSON.stringify(dataSession));
      dispatch(clearNotification());
    }
  };
};
export const logOut = () => {
  return async (dispatch) => {
    dispatch(deleteSession());
    dispatch(clearNotification());
    localStorage.removeItem("session");
  };
};

export default sessionSlice.reducer;
