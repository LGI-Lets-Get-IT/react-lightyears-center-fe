import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authApi } from "../../services/authService"

const initialState = {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async (body, { rejectWithValue }) => {
        try {
            console.log('TEST', body)
            const response = await authApi.login(body)
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
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.currentUser = action.payload;
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

// export const { createAppointment } = authSlice.actions
export default authSlice.reducer