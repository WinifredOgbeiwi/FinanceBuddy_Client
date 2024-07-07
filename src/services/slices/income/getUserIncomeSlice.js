import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchIncomeDetails = createAsyncThunk(
  "income/getIncomes",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/incomes/user/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  userIncomeDetails: null,
  loading: false,
  error: null,
};

const getUserIncomeSlice = createSlice({
  name: "getUserIncomes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userIncomeDetails = action.payload;
      })
      .addCase(fetchIncomeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getUserIncomeSlice.reducer;
