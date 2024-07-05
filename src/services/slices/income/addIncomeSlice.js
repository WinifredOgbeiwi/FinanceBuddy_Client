import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  income: null,
  token: null,
  loading: false,
  error: null,
};

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("income/add", credentials);
      const data = response.data;
      localStorage.setItem("token", data.token);
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
    logout: (state) => {
      localStorage.removeItem("token");
      state.income = null;
      state.token = null;
    },
  },
  extraReducer: (builder) => {
    builder
      .addCase(addIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.income = action.payload.income;
        state.token = action.payload.token;
      })
      .addCase(addIncome.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = addIncomeSlice.actions;

export default addIncomeSlice.reducer;
