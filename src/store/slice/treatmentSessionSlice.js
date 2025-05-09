import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { treatmentSessionsApi } from "@/services/treatmentSessionService";

const initialState = {
  sessions: [],
  session: null,
  isLoading: false,
  error: null,
};

export const fetchAllSessions = createAsyncThunk(
  "treatmentsession/getAllSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await treatmentSessionsApi.getAllSessions();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSessionById = createAsyncThunk(
  "treatmentsession/getSessionById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await treatmentSessionsApi.getSessionById(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const createSession = createAsyncThunk(
  "treatmentsession/createSession",
  async (data, { rejectWithValue }) => {
    try {
      const response = await treatmentSessionsApi.createSession(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const treatmentSessionSlice = createSlice({
  name: "treatmentsession",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSessions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllSessions.fulfilled, (state, action) => {
      state.isLoading = true;
      state.sessions = action.payload;
    });
    builder.addCase(fetchAllSessions.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(fetchSessionById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSessionById.fulfilled, (state, action) => {
      state.isLoading = true;
      state.session = action.payload;
    });
    builder.addCase(fetchSessionById.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
  },
});

export default treatmentSessionSlice.reducer;
