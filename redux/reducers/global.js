import types from "../types";

const initialState = {
  themeMode: "light",
  isDarkMode: false,
};

const global = (state = initialState, action) => {
  switch (action.type) {
    // case types.SET_THEME_MODE:
    //   return {
    //     ...state,
    //     themeMode: action.payload,
    //     isDarkMode: action.payload === "dark",
    //   };
    case types.SET_THEME_MODE:
      return {
        ...state,
        themeMode: action.payload,
        isDarkMode: action.payload === "dark",
      };
    default:
      return state;
  }
};

export default global;
