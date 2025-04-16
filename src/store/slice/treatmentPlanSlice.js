import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { treatmentPlansApi } from "@/services/treatmentPlanService";

const initialState = {
  plans: [],
  plan: null,
  isLoading: false,
  error: null,
};

export const fetchAllPlans = createAsyncThunk(
  "treatmentplan/getAllPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await treatmentPlansApi.getAllPlans();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPlanById = createAsyncThunk(
  "treatmentplan/getPlanById",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await treatmentPlansApi.getPlanById(planId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const createPlan = createAsyncThunk(
  "treatmentplan/createPlan",
  async (planData, { rejectWithValue }) => {
    try {
      const response = await treatmentPlansApi.createPlan(planData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const treatmentPlanSlice = createSlice({
  name: "treatmentplan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPlans.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllPlans.fulfilled, (state, action) => {
      state.isLoading = true;
      state.plans = action.payload;
    });
    builder.addCase(fetchAllPlans.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(fetchPlanById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlanById.fulfilled, (state, action) => {
      state.isLoading = true;
      state.plan = action.payload;
    });
    builder.addCase(fetchPlanById.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
  },
});

export default treatmentPlanSlice.reducer;
