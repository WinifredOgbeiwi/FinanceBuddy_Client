// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/slices/authSlice";
import registerReducer from "../services/slices/registerSlice";
import userReducer from "../services/slices/userSlice";
import editUserReducer from "./slices/editUserSlice";
import addIncomeReducer from "./slices/income/addIncomeSlice";
import getUserIncomesReducer from "./slices/income/getUserIncomeSlice";
import addExpensesReducer from "./slices/expenses/addExpensesSlice";
import getUserExpensesReducer from "./slices/expenses/getUserExpenses";
import addSavingsReducer from "./slices/savings/addSavingsSlice";
import getUserSavingsReducer from "./slices/savings/getUserSavings";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    user: userReducer,
    editUser: editUserReducer,
    //income
    addIncomes: addIncomeReducer,
    getUserIncomes: getUserIncomesReducer,
    // expense
    addExpenses: addExpensesReducer,
    getUserExpenses: getUserExpensesReducer,
    // saving
    addSavings: addSavingsReducer,
    getUserSavings: getUserSavingsReducer,
  },
});

export default store;
