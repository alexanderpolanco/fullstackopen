import { createContext, useReducer, useContext, useEffect } from "react";
import { reducerSession } from "../reducers/sessionReducer";
import { reducerNotification } from "../reducers/notificationReducer";

const initialState = {
  session: null,
  notification: null,
};

function combineReducers(reducers) {
  return (state, action) => {
    const newState = {};
    for (const key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}

const rootReducer = combineReducers({
  session: reducerSession,
  notification: reducerNotification,
});

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const persistedState = sessionStorage.getItem("session");
  const [state, dispatch] = useReducer(
    rootReducer,
    persistedState ? JSON.parse(persistedState) : initialState,
  );

  useEffect(() => {
    sessionStorage.setItem("session", JSON.stringify(state));
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
