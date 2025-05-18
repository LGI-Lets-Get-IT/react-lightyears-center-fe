import { filesApi } from "@/services/fileService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  file: null,
  isLoading: false,
  error: null,
};

export const fetchAllFiles = createAsyncThunk(
  "files/getAllFiles",
  async (query, { rejectWithValue }) => {
    try {
      const response = await filesApi.getAllFiles(query);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFileById = createAsyncThunk(
  "files/getFileById",
  async (fileId, { rejectWithValue }) => {
    try {
      const response = await filesApi.getAllFiles(fileId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await filesApi.uploadFile(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const generatePlanReport = createAsyncThunk(
  "files/generatePlanReport",
  async (id, { rejectWithValue }) => {
    try {
      const response = await filesApi.generatePlanReport(id);
      console.log("TESTT", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFiles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllFiles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.files = action.payload;
    });
    builder.addCase(fetchAllFiles.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(fetchFileById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFileById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.file = action.payload;
    });
    builder.addCase(fetchFileById.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(generatePlanReport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(generatePlanReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.file = action.payload;
    });
    builder.addCase(generatePlanReport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default fileSlice.reducer;
