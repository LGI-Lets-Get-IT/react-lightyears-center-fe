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

export const fetchAppointmentForTreatmentProgress = createAsyncThunk(
  "appointments/getAppointmentForTreatmentProgress",
  async (query, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.getAppointmentForTreatmentProgress(
        query
      );
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAppointmentForAssessments = createAsyncThunk(
  "appointments/getAppointmentForAssessments",
  async (query, { rejectWithValue }) => {
    try {
      console.log('query', query)
      const response = await appointmentsApi.getAppointmentForAssessments(
        query
      );
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAppointmentById = createAsyncThunk(
  "appointments/updateAppointmentById",
  async ({ appointmentId, data }, { rejectWithValue }) => {
    try {
      console.log('DATAA', data)
      const response = await appointmentsApi.updateAppointmentById(
        appointmentId,
        data
      );
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const confirmPicAttendanceById = createAsyncThunk(
  "appointments/confirmPicAttendanceById",
  async (appointmentId, { rejectWithValue, dispatch }) => {
    try {
      const response = await appointmentsApi.confirmPicAttendanceById(appointmentId);
      dispatch(fetchAppointmentById(appointmentId))
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAppointmentByIds = createAsyncThunk(
  "appointments/deleteAppointmentByIds",
  async (appointmentIds, { rejectWithValue, dispatch }) => {
    try {
      const response = await appointmentsApi.deleteAppointmentByIds(
        appointmentIds
      );
      dispatch(fetchAllAppointments());
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
      state.appointments = initialState.appointments;
    });
    builder.addCase(fetchAllAppointments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointments = action.payload;
    });
    builder.addCase(fetchAllAppointments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.appointments = initialState.appointments;
    });
    builder.addCase(fetchAppointmentById.pending, (state) => {
      state.isLoading = true;
      state.currentAppointment = initialState.currentAppointment;
    });
    builder.addCase(fetchAppointmentById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAppointment = action.payload;
    });
    builder.addCase(fetchAppointmentById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentAppointment = initialState.currentAppointment;
    });
    builder.addCase(fetchAppointmentForTreatmentProgress.pending, (state) => {
      state.isLoading = true;
      state.appointments = initialState.appointments;
    });
    builder.addCase(
      fetchAppointmentForTreatmentProgress.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      }
    );
    builder.addCase(
      fetchAppointmentForTreatmentProgress.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.appointments = initialState.appointments;
      }
    );
    builder.addCase(fetchAppointmentForAssessments.pending, (state) => {
      state.isLoading = true;
      state.appointments = initialState.appointments;
    });
    builder.addCase(fetchAppointmentForAssessments.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      }
    );
    builder.addCase(fetchAppointmentForAssessments.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.appointments = initialState.appointments;
      }
    );
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
        state.appointments = initialState.appointments;
        state.error = action.payload;
      });
    builder
    .addCase(deleteAppointmentByIds.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.appointments = initialState.appointments;
    })
    .addCase(deleteAppointmentByIds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointments = action.payload;
    })
    .addCase(deleteAppointmentByIds.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.appointments = initialState.appointments;
    });

    builder
    .addCase(confirmPicAttendanceById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(confirmPicAttendanceById.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(confirmPicAttendanceById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    
  },
});

export default appointmentSlice.reducer;
