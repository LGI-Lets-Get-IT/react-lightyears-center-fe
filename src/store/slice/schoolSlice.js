import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { schoolsApi } from "../../services/schoolService";

const initialState = {
  schools: [],
  school: null,
  schoolClients: [],
  isLoading: false,
  error: null,
};

export const fetchAllSchools = createAsyncThunk(
  "schools/getAllSchools",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await schoolsApi.getAllSchools();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSchoolById = createAsyncThunk(
  "schools/getSchoolById",
  async (schoolId, { rejectWithValue }) => {
    try {
      const response = await schoolsApi.getSchoolById(schoolId);
      // console.log("fetchSchoolById RESPONSE: ", response.data.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSchoolClientsById = createAsyncThunk(
  "schools/getSchoolClientsById",
  async (schoolId, { rejectWithValue }) => {
    try {
      const response = await schoolsApi.getSchoolClientsById(schoolId);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const createSchool = createAsyncThunk(
  "schools/createSchool",
  async (data, { rejectWithValue }) => {
    try {
      const response = await schoolsApi.createSchool(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSchools.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllSchools.fulfilled, (state, action) => {
      state.isLoading = true;
      state.schools = action.payload;
    });
    builder.addCase(fetchAllSchools.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(fetchSchoolById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSchoolById.fulfilled, (state, action) => {
      state.isLoading = true;
      state.school = action.payload;
    });
    builder.addCase(fetchSchoolById.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(fetchSchoolClientsById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSchoolClientsById.fulfilled, (state, action) => {
      state.isLoading = true;
      state.schoolClients = action.payload;
    });
    builder.addCase(fetchSchoolClientsById.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
  },
});

// export const { createSchool } = clientSlice.actions
export default schoolSlice.reducer;
