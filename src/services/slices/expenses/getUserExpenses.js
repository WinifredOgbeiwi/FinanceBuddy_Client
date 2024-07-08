import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchExpensesDetails = createAsyncThunk(
  "expenses/getExpenses",
  async ({ userId, page, incomesPerPage }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/expenses/user/${userId}?page=${page}&limit=${incomesPerPage}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userExpensesDetails: [],
  currentPage: 1,
  expensesPerPage: 10,
  totalExpenses: 0,
  loading: false,
  error: null,
};

const getUserExpensesSlice = createSlice({
  name: "getUserExpenses",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpensesDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userExpensesDetails = action.payload.expenses;
        state.totalExpenses = action.payload.totalExpenses;
      })
      .addCase(fetchExpensesDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = getUserExpensesSlice.actions;

export default getUserExpensesSlice.reducer;
