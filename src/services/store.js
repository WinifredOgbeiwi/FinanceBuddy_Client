// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/slices/authSlice";
import registerReducer from "../services/slices/registerSlice";
import userReducer from "../services/slices/userSlice";
import editUserReducer from "./slices/editUserSlice"
import addIncome from "./slices/income/addIncomeSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    user: userReducer,
    editUser: editUserReducer,
    //income
    addIncome:addIncome
  },
});

export default store;
