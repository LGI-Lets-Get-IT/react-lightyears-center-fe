import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./slice/appointmentSlice";
import clientReducer from "./slice/clientSlice";
import employeeReducer from "./slice/employeeSlice";
import schoolReducer from "./slice/schoolSlice";
import authReducer from './slice/authSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
// import treatmentPlanReducer from "./slice/treatmentPlanSlice";

const authPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['currentUser', 'isAuthenticated'],
}

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    // treatmentPlans: treatmentPlanReducer,
    appointment: appointmentReducer,
    clients: clientReducer,
    employees: employeeReducer,
    schools: schoolReducer,
  },
  // middleware
});
export const persistor = persistStore(store);
