import API from "@/src/networking/NetworkService";
import { endpoints } from "../../src/networking/endpoints";
import types from "../types";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const setThemeMode = (mode) => ({
  type: types.SET_THEME_MODE,
  payload: mode,
});

export const addTodo = (todo) => ({
  type: types.ADD_TODO,
  payload: todo,
});

export const getProducts = ({ SuccessCallback, FailureCallback }) => {
  return (dispatch, getState) => {
    API.getInstance().Fetch(endpoints.getProducts, defaultHeaders, "", {
      SuccessCallback: (response) => {
        SuccessCallback(response);
      },
      FailureCallback: (response) => {
        FailureCallback(response);
      },
    });
  };
};
