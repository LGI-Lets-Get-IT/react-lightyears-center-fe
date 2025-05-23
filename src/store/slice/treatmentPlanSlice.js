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

export const updatePlanById = createAsyncThunk(
  "treatmentplan/updatePlanById",
  async ({ planId, data }, { rejectWithValue }) => {
    try {
      const response = await treatmentPlansApi.updatePlanById(planId, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePlanById = createAsyncThunk(
  "treatmentplan/deletePlanById",
  async (body, { rejectWithValue }) => {
    try {
      const response = await treatmentPlansApi.deletePlanById(body);
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
      state.isLoading = false;
      state.plans = action.payload;
    });
    builder.addCase(fetchAllPlans.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchPlanById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlanById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.plan = action.payload;
    });
    builder.addCase(fetchPlanById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createPlan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.plan = action.payload;
    });
    builder.addCase(createPlan.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updatePlanById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePlanById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.plan = action.payload;
    });
    builder.addCase(updatePlanById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deletePlanById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePlanById.fulfilled, (state) => {
      state.isLoading = false;
      state.plan = null;
    });
    builder.addCase(deletePlanById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default treatmentPlanSlice.reducer;
