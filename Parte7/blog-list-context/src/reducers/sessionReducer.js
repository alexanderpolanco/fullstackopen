import login from "../services/login";
import {
  showNotification,
  clearNotificationAction,
} from "./notificationReducer";

export function reducerSession(state, action) {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logOut":
      return null;
    default:
      return state;
  }
}

export async function loginAction({ username, password }, dispatch) {
  const response = await login(username, password);

  if ("error" in response) {
    showNotification(
      {
        description: response.error,
        type: "error",
      },
      dispatch,
    );
  } else {
    const { data } = response;

    const dataSession = {
      username: data.username,
      token: data.token,
    };

    localStorage.setItem("session", JSON.stringify(dataSession));

    dispatch({
      type: "login",
      payload: dataSession,
    });
  }
}

export function logOutAction(dispatch) {
  localStorage.removeItem("session");
  dispatch(clearNotificationAction());
  dispatch({
    type: "logOut",
    payload: null,
  });
}
