import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  income: null,
  token: null,
  loading: false,
  error: null,
  success: false, 
};

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("incomes/add", credentials);
      const data = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addIncomeSlice = createSlice({
  name: "addIncome",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false; 
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.income = action.payload;
        state.success = true; 
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = addIncomeSlice.actions;

export default addIncomeSlice.reducer;
