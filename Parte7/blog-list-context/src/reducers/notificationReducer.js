export function reducerNotification(state, action) {
  switch (action.type) {
    case "showNotification":
      return action.payload;
    case "clearNotification":
      return null;
    default:
      return state;
  }
}

export function showNotification(message, dispatch) {
  setTimeout(() => {
    dispatch(clearNotificationAction());
  }, 5000);

  dispatch({
    type: "showNotification",
    payload: message,
  });
}

export function clearNotificationAction() {
  return {
    type: "clearNotification",
  };
}
