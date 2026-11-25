import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "@/services/dashboardService";

const initialState = {
  dashboardData: [],
  isLoading: true,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getDashboardData();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dashboardData = action.payload;
    });
    builder.addCase(fetchDashboardData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
