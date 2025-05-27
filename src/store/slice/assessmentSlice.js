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

export const updateAssessmentById = createAsyncThunk(
  "assessments/updateAssessmentById",
  async (bodyData, { rejectWithValue }) => {
    try {
      const { assessmentId, data } = bodyData;
      const response = await assessmentsApi.updateAssessmentById(
        assessmentId,
        data
      );
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
  async (query, { rejectWithValue }) => {
    try {
      const response = await assessmentsApi.getAssessmentByAppointmentId(query);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAssessmentByIds = createAsyncThunk(
  "assessments/deleteAssessmentByIds",
  async (assessmentIds, { rejectWithValue, dispatch }) => {
    try {
      const response = await assessmentsApi.deleteAssessmentByIds(
        assessmentIds
      );
      dispatch(fetchAllAssessments());
      return response.data?.data;
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
      state.assessments = initialState.assessments;
    });
    builder.addCase(fetchAllAssessments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.assessments = action.payload;
    });
    builder.addCase(fetchAllAssessments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.assessments = initialState.assessments;
    });
    builder.addCase(fetchAssessmentById.pending, (state) => {
      state.isLoading = true;
      state.currentAssessment = initialState.currentAssessment;
    });
    builder.addCase(fetchAssessmentById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAssessment = action.payload;
    });
    builder.addCase(fetchAssessmentById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentAssessment = initialState.currentAssessment;
    });
    builder.addCase(fetchAssessmentByAppointmentId.pending, (state) => {
      state.isLoading = true;
      state.currentAssessment = initialState.currentAssessment;
    });
    builder.addCase(
      fetchAssessmentByAppointmentId.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.assessments = action.payload;
      }
    );
    builder.addCase(
      fetchAssessmentByAppointmentId.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.currentAssessment = initialState.currentAssessment;
      }
    );
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
        state.error = action.payload;
      });
    builder
      .addCase(updateAssessmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentAssessment = initialState.currentAssessment;
      })
      .addCase(updateAssessmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentAssessment = action.payload;
      })
      .addCase(updateAssessmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.currentAssessment = initialState.currentAssessment;
      });
    builder
      .addCase(deleteAssessmentByIds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.assessments = initialState.assessments;
      })
      .addCase(deleteAssessmentByIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assessments = action.payload;
      })
      .addCase(deleteAssessmentByIds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.assessments = initialState.assessments;
      });
  },
});

export default assessmentSlice.reducer;
