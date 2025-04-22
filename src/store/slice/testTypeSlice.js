import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { testTypesApi } from "@/services/testTypeService";

const initialState = {
  testTypes: [],
  type: null,
  isLoading: false,
  error: null,
};

export const fetchAllTestTypes = createAsyncThunk(
  "testtype/getAllTestTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await testTypesApi.getAllTestTypes();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTestTypeById = createAsyncThunk(
  "testtype/getTestTypeById",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await testTypesApi.getTestTypeById(planId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const createTestType = createAsyncThunk(
  "testtype/createTestType",
  async (data, { rejectWithValue }) => {
    try {
      const response = await testTypesApi.createTestType(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const testTypeSlice = createSlice({
  name: "testtype",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTestTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTestTypes.fulfilled, (state, action) => {
      state.isLoading = true;
      state.testTypes = action.payload;
    });
    builder.addCase(fetchAllTestTypes.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(fetchTestTypeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTestTypeById.fulfilled, (state, action) => {
      state.isLoading = true;
      state.type = action.payload;
    });
    builder.addCase(fetchTestTypeById.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
  },
});

export default testTypeSlice.reducer;
