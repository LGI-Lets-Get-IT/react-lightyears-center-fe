import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appointmentsApi } from "../../services/appointmentService";

const initialState = {
  appointments: [],
  currentAppointment: null,
  isLoading: false,
  error: null,
};

export const makeAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.createAppointment(data);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllAppointments = createAsyncThunk(
  "appointments/getAllAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.getAllAppointments();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAppointmentById = createAsyncThunk(
  "appointments/getAppointmentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.getAppointmentById(id);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAppointments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllAppointments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointments = action.payload;
    });
    builder.addCase(fetchAllAppointments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchAppointmentById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAppointmentById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAppointment = action.payload;
    });
    builder.addCase(fetchAppointmentById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder
      .addCase(makeAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(makeAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(makeAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.appointments = initialState.appointments
        state.error = action.payload;
      });
  },
});

export const { createAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
