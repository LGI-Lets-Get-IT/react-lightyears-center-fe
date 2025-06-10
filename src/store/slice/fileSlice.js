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
  async ({ appointmentId, uuid, clientName, file }, { rejectWithValue, dispatch }) => {
    try {
      const uploadFileData = new FormData();
      uploadFileData.append('appointmentId', appointmentId)
      uploadFileData.append('uuid', uuid)
      uploadFileData.append('clientName', clientName)
      uploadFileData.append('file', file)

      const response = await filesApi.uploadFile(uploadFileData);

      dispatch(fetchAllFiles({
        params: {
          appointmentId,
          uuid,
          clientName,
        }
      }))
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const downloadFile = createAsyncThunk(
  "files/downloadFile",
  async (fileId, { rejectWithValue }) => {
    try {
      const response = await filesApi.downloadFile(fileId);
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const generateDailyProgressReport = createAsyncThunk(
  "files/generateDailyProgressReport",
  async (id, { rejectWithValue }) => {
    try {
      const response = await filesApi.generateDailyProgressReport(id);
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
      state.isLoading = false;
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
    builder.addCase(generateDailyProgressReport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(generateDailyProgressReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.file = action.payload;
    });
    builder.addCase(generateDailyProgressReport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(uploadFile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.file = action.payload;
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default fileSlice.reducer;
