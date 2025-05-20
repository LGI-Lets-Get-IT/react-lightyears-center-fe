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

export const fetchClientByUuid = createAsyncThunk(
  "clients/fetchClientByUuid",
  async (clientUuid, { rejectWithValue }) => {
    try {
      const response = await clientsApi.getClientByUuid(clientUuid);
      // console.log("CLIENT ID: ", clientId);
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

export const updateClientByUuid = createAsyncThunk(
  "clients/updateClientByUuid",
  async (clientData, { rejectWithValue, dispatch }) => {
    try {
      const { clientUuid, ...data } = clientData;
      const response = await clientsApi.updateClientByUuid(clientUuid, data);
      // dispatch(fetchAllClients());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await clientsApi.deleteClient(clientData);
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
    builder.addCase(fetchClientByUuid.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchClientByUuid.fulfilled, (state, action) => {
      state.isLoading = true;
      state.currentClient = action.payload;
    });
    builder.addCase(fetchClientByUuid.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
  },
});

// export const { createClient } = clientSlice.actions
export default clientSlice.reducer;
