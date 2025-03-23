import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { appointmentsApi } from "../../services/appointmentService"

const initialState = {
    appointments: [],
    currentAppointment: null,
    isLoading: false,
    error: null,
}

export const fetchAllAppointments = createAsyncThunk(
    'appointments/getAllAppointments',
    async (_, { rejectWithValue}) => {
        try {
            const response = await appointmentsApi.getAllAppointments()
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        createAppointment: (state) => {
            console.log('APPOINTMENT CREATED')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllAppointments.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchAllAppointments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.appointments = action.payload
        })
        builder.addCase(fetchAllAppointments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }
})

export const { createAppointment } = appointmentSlice.actions
export default appointmentSlice.reducer