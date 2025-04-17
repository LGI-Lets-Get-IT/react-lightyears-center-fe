import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authApi } from "../../services/authService"

const initialState = {
    currentUser: null,
    accessToken: null,
    isAuthenticated: false,
    isRememberMe: false,
    isLoading: false,
    error: null,
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async (body, { rejectWithValue }) => {
        try {
            const response = await authApi.login(body);
            console.log('RESPONSEEE', response.data.data)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const userLogout = createAsyncThunk(
    'auth/logout',
    async (body, { rejectWithValue }) => {
        try {
            const response = await authApi.logout(body);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.currentUser = action.payload.user;
            state.accessToken = action.payload.accessToken;
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(userLogout.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.currentUser = null;
            state.accessToken = null;
        });
        builder.addCase(userLogout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})

// export const { createAppointment } = authSlice.actions
export default authSlice.reducer