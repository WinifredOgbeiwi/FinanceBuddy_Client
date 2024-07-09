import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchSavingsDetails = createAsyncThunk(
  "savings/getSavings",
  async ({ userId, page, savingsPerPage }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/savings/user/${userId}?page=${page}&limit=${savingsPerPage}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userSavingsDetails: [],
  currentPage: 1,
  savingsPerPage: 10,
  totalSavings: 0,
  loading: false,
  error: null,
};

const getUserSavingsSlice = createSlice({
  name: "getUserSavings",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavingsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavingsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userSavingsDetails = action.payload.savings;
        state.totalSavings = action.payload.totalSavings;
      })
      .addCase(fetchSavingsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = getUserSavingsSlice.actions;

export default getUserSavingsSlice.reducer;
