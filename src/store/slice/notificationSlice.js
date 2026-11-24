import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ type = "success", message }) => ({
        payload: { id: nanoid(), type, message },
      }),
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const notifySuccess = (message) =>
  addNotification({ type: "success", message });

export const notifyError = (message) =>
  addNotification({ type: "error", message });

export default notificationSlice.reducer;
