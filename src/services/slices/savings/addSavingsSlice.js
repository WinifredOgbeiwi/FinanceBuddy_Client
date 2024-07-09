import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  savings: null,
  token: null,
  loading: false,
  error: null,
  success: false,
};

export const addSavings = createAsyncThunk(
  "savings/addSavings",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("savings/add", credentials);
      const data = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addSavingsSlice = createSlice({
  name: "addSavings",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSavings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addSavings.fulfilled, (state, action) => {
        state.loading = false;
        state.savings = action.payload;
        state.success = true;
      })
      .addCase(addSavings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = addSavingsSlice.actions;

export default addSavingsSlice.reducer;
