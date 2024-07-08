import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  expenses: null,
  token: null,
  loading: false,
  error: null,
  success: false,
};

export const addExpenses = createAsyncThunk(
  "expenses/addExpenses",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("expenses/add", credentials);
      const data = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addExpensesSlice = createSlice({
  name: "addExpenses",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
        state.success = true;
      })
      .addCase(addExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = addExpensesSlice.actions;

export default addExpensesSlice.reducer;
