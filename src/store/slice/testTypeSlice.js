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
  async (testId, { rejectWithValue }) => {
    try {
      const response = await testTypesApi.getTestTypeById(testId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTestType = createAsyncThunk(
  "testtype/createTestType",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await testTypesApi.createTestType(data);
      dispatch(fetchAllTestTypes());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTestTypeById = createAsyncThunk(
  "testtype/updateTestTypeById",
  async (bodyData, { rejectWithValue }) => {
    try {
      const { testTypeId, data } = bodyData;
      const response = await testTypesApi.updateTestTypeById(testTypeId, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTestTypeByIds = createAsyncThunk(
  "testtype/deleteTestTypeByIds",
  async (testIds, { rejectWithValue, dispatch }) => {
    try {
      const response = await testTypesApi.deleteTestTypeByIds(testIds);
      dispatch(fetchAllTestTypes());
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
      state.isLoading = false;
      state.testTypes = action.payload;
    });
    builder.addCase(fetchAllTestTypes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchTestTypeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTestTypeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.type = action.payload;
    });
    builder.addCase(fetchTestTypeById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createTestType.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTestType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.type = action.payload;
    });
    builder.addCase(createTestType.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateTestTypeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTestTypeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.type = action.payload;
    });
    builder.addCase(updateTestTypeById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteTestTypeByIds.pending, (state) => {
      state.isLoading = true;
      state.testTypes = initialState.testTypes;
    });
    builder.addCase(deleteTestTypeByIds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.testTypes = action.payload;
    });
    builder.addCase(deleteTestTypeByIds.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.testTypes = initialState.testTypes;
    });
  },
});

export default testTypeSlice.reducer;
