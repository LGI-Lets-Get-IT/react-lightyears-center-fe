import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/authService";

const initialState = {
  currentUser: null,
  // FIXED: Remove accessToken from state since we're using HTTP-only cookies
  // accessToken: null, // OLD CODE - commented out
  isAuthenticated: false,
  isRememberMe: false,
  isLoading: false,
  error: null,
};

export const userLogin = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await authApi.login(body);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const userLogout = createAsyncThunk(
  "auth/logout",
  async (body, { rejectWithValue }) => {
    try {
      const response = await authApi.logout(body);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userRefreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (body, { rejectWithValue }) => {
    try {
      const response = await authApi.refreshToken(body);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(email);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userChangePassword = createAsyncThunk(
  "auth/changePassword",
  async (requestBody, { rejectWithValue }) => {
    try {
      const response = await authApi.changePassword(requestBody);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userEditProfile = createAsyncThunk(
  "auth/editProfile",
  async (requestBody, { rejectWithValue }) => {
    try {
      const response = await authApi.editProfile(requestBody);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetCurrentUser: (state) => {
      state.currentUser = null;
      // FIXED: Remove accessToken reset since we're using HTTP-only cookies
      // state.accessToken = null; // OLD CODE - commented out
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload.user;
      // FIXED: Remove accessToken storage since we're using HTTP-only cookies
      // state.accessToken = action.payload.accessToken; // OLD CODE - commented out
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.currentUser = null;
      // FIXED: Remove accessToken reset since we're using HTTP-only cookies
      // state.accessToken = null; // OLD CODE - commented out
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(userRefreshToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userRefreshToken.fulfilled, (state, action) => {
      state.isLoading = false;
      // FIXED: Remove accessToken storage since we're using HTTP-only cookies
      // state.accessToken = action.payload.accessToken; // OLD CODE - commented out
      state.currentUser = action.payload.user;
    });
    builder.addCase(userRefreshToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(userForgotPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userForgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(userForgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetCurrentUser } = authSlice.actions;
export default authSlice.reducer;
