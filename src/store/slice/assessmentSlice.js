import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { assessmentsApi } from "../../services/assessmentService";

const initialState = {
  assessments: [],
  currentAssessment: null,
  isLoading: false,
  error: null,
};

export const createAssessment = createAsyncThunk(
  "assessments/createAssessment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await assessmentsApi.createAssessment(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllAssessments = createAsyncThunk(
  "assessments/getAllAssessments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await assessmentsApi.getAllAssessments();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAssessmentById = createAsyncThunk(
  "assessments/getAssessmentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await assessmentsApi.getAssessmentById(id);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAssessmentByAppointmentId = createAsyncThunk(
  "assessments/getAssessmentByAppointmentId",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const response = await assessmentsApi.getAssessmentByAppointmentId(appointmentId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAssessments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllAssessments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.assessments = action.payload;
    });
    builder.addCase(fetchAllAssessments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchAssessmentById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAssessmentById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAssessment = action.payload;
    });
    builder.addCase(fetchAssessmentById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchAssessmentByAppointmentId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAssessmentByAppointmentId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAssessment = action.payload;
    });
    builder.addCase(fetchAssessmentByAppointmentId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder
      .addCase(createAssessment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAssessment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assessments = action.payload;
      })
      .addCase(createAssessment.rejected, (state, action) => {
        state.isLoading = false;
        state.assessments = initialState.assessments
        state.error = action.payload;
      });
  },
});

// export const { createAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
