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
  async (_, { rejectWithValue }) => {
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
  async (bodyData, { rejectWithValue }) => {
    try {
      const { uuid, data } = bodyData;
      const response = await clientsApi.updateClientByUuid(uuid, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateClientPassword = createAsyncThunk(
  "clients/updateClientPasswordByUuid",
  async (bodyData, { rejectWithValue }) => {
    try {
      const { uuid, data } = bodyData;
      const response = await clientsApi.updateClientPasswordByUuid(uuid, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteClientByUuids = createAsyncThunk(
  "clients/deleteClientByUuids",
  async (clientData, { rejectWithValue, dispatch }) => {
    try {
      const response = await clientsApi.deleteClientByUuids(clientData);
      dispatch(fetchAllClients());
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
      state.clients = initialState.clients;
    });
    builder.addCase(fetchAllClients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clients = action.payload;
    });
    builder.addCase(fetchAllClients.rejected, (state, action) => {
      state.isLoading = false;
      state.clients = initialState.clients;
      state.error = action.payload;
    });
    builder.addCase(fetchClientByUuid.pending, (state) => {
      state.isLoading = true;
      state.currentClient = initialState.currentClient;
    });
    builder.addCase(fetchClientByUuid.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentClient = action.payload;
    });
    builder.addCase(fetchClientByUuid.rejected, (state, action) => {
      state.isLoading = false;
      state.currentClient = initialState.currentClient;
      state.error = action.payload;
    });
    builder.addCase(createClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentClient = action.payload;
    });
    builder.addCase(createClient.rejected, (state, action) => {
      state.isLoading = false;
      state.currentClient = initialState.currentClient;
      state.error = action.payload;
    });
    builder.addCase(updateClientByUuid.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateClientByUuid.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentClient = action.payload;
    });
    builder.addCase(updateClientByUuid.rejected, (state, action) => {
      state.isLoading = false;
      // state.currentClient = initialState.currentClient;
      state.error = action.payload;
    });
    builder.addCase(updateClientPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateClientPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentClient = action.payload;
    });
    builder.addCase(updateClientPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.currentClient = initialState.currentClient;
      state.error = action.payload;
    });
    builder.addCase(deleteClientByUuids.pending, (state) => {
      state.isLoading = true;
      state.clients = initialState.clients;
    });
    builder.addCase(deleteClientByUuids.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clients = action.payload;
    });
    builder.addCase(deleteClientByUuids.rejected, (state, action) => {
      state.isLoading = false;
      state.clients = initialState.clients;
      state.error = action.payload;
    });
  },
});

// export const { createClient } = clientSlice.actions
export default clientSlice.reducer;
