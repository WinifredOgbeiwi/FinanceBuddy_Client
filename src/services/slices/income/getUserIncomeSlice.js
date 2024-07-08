import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchIncomeDetails = createAsyncThunk(
  "income/getIncomes",
  async ({ userId, page, incomesPerPage }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/incomes/user/${userId}?page=${page}&limit=${incomesPerPage}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userIncomeDetails: [],
  currentPage: 1,
  incomesPerPage: 10,
  totalIncomes: 0,
  loading: false,
  error: null,
};

const getUserIncomeSlice = createSlice({
  name: "getUserExpenses",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userIncomeDetails = action.payload.incomes;
        state.totalIncomes = action.payload.totalIncomes;
      })
      .addCase(fetchIncomeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = getUserIncomeSlice.actions;

export default getUserIncomeSlice.reducer;
