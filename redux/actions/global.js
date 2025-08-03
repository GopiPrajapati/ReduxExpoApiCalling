import types from "../types";

export const setThemeMode = (mode) => ({
  type: types.SET_THEME_MODE,
  payload: mode,
});
