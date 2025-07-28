import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { picSchedulesApi } from "@/services/picScheduleService";

const initialState = {
  schedules: [],
  schedule: null,
  isLoading: false,
  error: null,
};

export const fetchAllPicSchedules = createAsyncThunk(
  "picschedule/getAllPicSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const response = await picSchedulesApi.getAllPicSchedules();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPicScheduleById = createAsyncThunk(
  "picschedule/getPicScheduleById",
  async (scheduleId, { rejectWithValue }) => {
    try {
      const response = await picSchedulesApi.getPicScheduleById(scheduleId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPicSchedule = createAsyncThunk(
  "picschedule/createPicSchedule",
  async (data, { rejectWithValue }) => {
    try {
      const response = await picSchedulesApi.createPicSchedule(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePicScheduleById = createAsyncThunk(
  "picschedule/updatePicScheduleById",
  async (bodyData, { rejectWithValue }) => {
    try {
      const { scheduleId, data } = bodyData;
      const response = await picSchedulesApi.updatePicScheduleById(
        scheduleId,
        data
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePicScheduleByIds = createAsyncThunk(
  "picschedule/deletePicScheduleByIds",
  async (scheduleIds, { rejectWithValue, dispatch }) => {
    try {
      const response = await picSchedulesApi.deletePicScheduleByIds(
        scheduleIds
      );
      dispatch(fetchAllPicSchedules());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const picScheduleSlice = createSlice({
  name: "picschedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPicSchedules.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllPicSchedules.fulfilled, (state, action) => {
      state.isLoading = false;
      state.schedules = action.payload;
    });
    builder.addCase(fetchAllPicSchedules.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchPicScheduleById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPicScheduleById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.schedule = action.payload;
    });
    builder.addCase(fetchPicScheduleById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createPicSchedule.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPicSchedule.fulfilled, (state, action) => {
      state.isLoading = false;
      state.schedule = action.payload;
    });
    builder.addCase(createPicSchedule.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updatePicScheduleById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePicScheduleById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.schedule = action.payload;
    });
    builder.addCase(updatePicScheduleById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deletePicScheduleByIds.pending, (state) => {
      state.isLoading = true;
      state.schedules = initialState.schedules;
    });
    builder.addCase(deletePicScheduleByIds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.schedules = action.payload;
    });
    builder.addCase(deletePicScheduleByIds.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.schedules = initialState.schedules;
    });
  },
});

export default picScheduleSlice.reducer;
