import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./slice/appointmentSlice";
import clientReducer from "./slice/clientSlice";
import schoolReducer from "./slice/schoolSlice";
import treatmentPlanReducer from "./slice/treatmentPlanSlice";

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    clients: clientReducer,
    schools: schoolReducer,
    treatmentPlans: treatmentPlanReducer
  },
  // middleware
});
