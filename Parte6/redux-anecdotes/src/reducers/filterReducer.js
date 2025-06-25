export const addFilter = (filter) => {
  return {
    type: "FILTER",
    payload: filter,
  };
};

const initialState = "";

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload;
      break;
    default:
      return state;
  }
};

export default filterReducer;
