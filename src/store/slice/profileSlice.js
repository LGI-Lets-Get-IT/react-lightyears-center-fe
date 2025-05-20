import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profilesApi } from "@/services/profileService";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profilesApi.getUserProfile();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.isLoading = true;
      state.user = action.payload;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
  },
});

// export const { createClient } = clientSlice.actions
export default profileSlice.reducer;
