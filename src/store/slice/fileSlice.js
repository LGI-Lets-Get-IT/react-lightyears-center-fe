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
  async (_, { rejectWithValue }) => {
    try {
      const response = await filesApi.getAllFiles();
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

export const createFile = createAsyncThunk(
  "files/createFile",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await filesApi.getAllFiles(data);
      return response.data.data;
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
      state.isLoading = true;
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
      state.isLoading = true;
      state.file = action.payload;
    });
    builder.addCase(fetchFileById.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
  },
});

export default fileSlice.reducer;
