import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { treatmentTypesApi } from "@/services/treatmentTypeService";

const initialState = {
  treatmentTypes: [],
  type: null,
  isLoading: false,
  error: null,
};

export const fetchAllTreatmentTypes = createAsyncThunk(
  "treatmenttype/getAllTreatmentTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await treatmentTypesApi.getAllTreatmentTypes();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTreatmentTypeById = createAsyncThunk(
  "treatmenttype/getTreatmentTypeById",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await treatmentTypesApi.getTreatmentTypeById(planId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const createTreatmentType = createAsyncThunk(
  "treatmenttype/createTreatmentType",
  async (data, { rejectWithValue }) => {
    try {
      const response = await treatmentTypesApi.createTreatmentType(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTreatmentTypeById = createAsyncThunk(
  "testtype/updateTreatmentTypeById",
  async (bodyData, { rejectWithValue }) => {
    try {
      const { treatmentTypeId, data } = bodyData
      const response = await treatmentTypesApi.updateTreatmentTypeById(treatmentTypeId, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const treatmentTypeSlice = createSlice({
  name: "treatmenttype",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTreatmentTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTreatmentTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.treatmentTypes = action.payload;
    });
    builder.addCase(fetchAllTreatmentTypes.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(fetchTreatmentTypeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTreatmentTypeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.type = action.payload;
    });
    builder.addCase(fetchTreatmentTypeById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateTreatmentTypeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTreatmentTypeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.type = action.payload;
    });
    builder.addCase(updateTreatmentTypeById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default treatmentTypeSlice.reducer;
