import types from "../types";

const todoListInitialState = [
  { userId: "001", userName: "Gopi", userSurname: "Prajapati" },
  { userId: "002", userName: "Alok", userSurname: "Chaurasiya" },
  { userId: "003", userName: "Sanjana", userSurname: "Murari" },
  { userId: "004", userName: "Nilesh", userSurname: "Patel" },
  { userId: "005", userName: "Hiren", userSurname: "Valera" },
  { userId: "006", userName: "Brijesh", userSurname: "Mehta" },
];

const initialState = {
  themeMode: "light",
  isDarkMode: false,
  todoList: [
    { userId: "001", userName: "Gopi", userSurname: "Prajapati" },
    { userId: "002", userName: "Alok", userSurname: "Chaurasiya" },
    { userId: "003", userName: "Sanjana", userSurname: "Murari" },
    { userId: "004", userName: "Nilesh", userSurname: "Patel" },
    { userId: "005", userName: "Hiren", userSurname: "Valera" },
    { userId: "006", userName: "Brijesh", userSurname: "Mehta" },
  ],
};

// const global = (state = initialState, action) => {
//   switch (action.type) {
//     // case types.SET_THEME_MODE:
//     //   return {
//     //     ...state,
//     //     themeMode: action.payload,
//     //     isDarkMode: action.payload === "dark",
//     //   };
//     case types.SET_THEME_MODE:
//       return {
//         ...state,
//         themeMode: action.payload,
//         isDarkMode: action.payload === "dark",
//       };
//     case types.ADD_TODO:
//       console.log("Adding todo:", action.payload);
//       console.log("Adding todo:", state);
//       return {
//         ...state,
//         todoList: [...state.todoList, action.payload],
//       };
//     default:
//       return state;
//   }
// };
const global = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_THEME_MODE:
      return {
        ...state,
        themeMode: action.payload,
        isDarkMode: action.payload === "dark",
      };
    case types.ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    default:
      return state;
  }
};

export default global;
