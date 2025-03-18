import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientsApi } from "../../services/clientService";

const initialState = {
  clients: [],
  currentClient: null,
  isLoading: false,
  error: null,
};

export const fetchAllClients = createAsyncThunk(
  "clients/getAllClients",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await clientsApi.getAllClients();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchClientById = createAsyncThunk(
  "clients/getClientById",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await clientsApi.getClientById(clientId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (clientData, { rejectWithValue, dispatch }) => {
    try {
      const response = await clientsApi.createClient(clientData);
      // dispatch(fetchAllClients());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (clientId, { rejectWithValue, dispatch }) => {
    try {
      const response = await clientsApi.deleteClient(clientId);
      // dispatch(fetchAllClients());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllClients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllClients.fulfilled, (state, action) => {
      state.isLoading = true;
      state.clients = action.payload;
    });
    builder.addCase(fetchAllClients.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(fetchClientById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchClientById.fulfilled, (state, action) => {
      state.isLoading = true;
      state.currentClient = action.payload;
    });
    builder.addCase(fetchClientById.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
  },
});

// export const { createClient } = clientSlice.actions
export default clientSlice.reducer;
