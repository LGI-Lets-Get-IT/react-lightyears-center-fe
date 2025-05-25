import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { employeesApi } from "@/services/employeeService";

const initialState = {
  employees: [],
  employee: null,
  psychologists: [],
  therapists: [],
  isLoading: false,
  error: null,
};

export const fetchAllEmployees = createAsyncThunk(
  "employees/getAllEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeesApi.getAllEmployees();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllPsychologists = createAsyncThunk(
  "employees/getAllPsychologists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeesApi.getAllPsychologists();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllTherapists = createAsyncThunk(
  "employees/getAllTherapists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeesApi.getAllTherapists();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/getEmployeeById",
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await employeesApi.getEmployeeById(employeeId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await employeesApi.createEmployee(employeeData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployeeById = createAsyncThunk(
  "employees/updateEmployeeById",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await employeesApi.updateEmployeeById(id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const updateEmployeePassword = createAsyncThunk(
  "employees/updateEmployeePasswordById",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await employeesApi.updateEmployeePasswordById(id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEmployeeByIds = createAsyncThunk(
  "employees/deleteEmployeeByIds",
  async (employeeIds, { rejectWithValue, dispatch }) => {
    try {
      const response = await employeesApi.deleteEmployeeByIds(employeeIds);
      dispatch(fetchAllEmployees());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployees.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees = action.payload;
    });
    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchAllPsychologists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllPsychologists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.psychologists = action.payload;
    });
    builder.addCase(fetchAllPsychologists.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchAllTherapists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTherapists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.therapists = action.payload;
    });
    builder.addCase(fetchAllTherapists.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchEmployeeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEmployeeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employee = action.payload;
    });
    builder.addCase(fetchEmployeeById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateEmployeeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateEmployeeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employee = action.payload;
    });
    builder.addCase(updateEmployeeById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateEmployeePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateEmployeePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employee = action.payload;
    });
    builder.addCase(updateEmployeePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteEmployeeByIds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteEmployeeByIds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees = action.payload;
    });
    builder.addCase(deleteEmployeeByIds.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default employeeSlice.reducer;
