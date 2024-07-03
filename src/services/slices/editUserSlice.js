// services/slices/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const editUserDetails = createAsyncThunk(
  "user/editUserdetails",
  async ({ id, userData }, thunkAPI) => {
    try {
      const response = await axios.put(`/user/edit/${id}`, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const editUserSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default editUserSlice.reducer;
