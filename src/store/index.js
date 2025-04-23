import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import appointmentReducer from "./slice/appointmentSlice";
import assessmentReducer from "./slice/assessmentSlice";
import clientReducer from "./slice/clientSlice";
import employeeReducer from "./slice/employeeSlice";
import schoolReducer from "./slice/schoolSlice";
import authReducer from './slice/authSlice';
import { persistReducer, persistStore } from "redux-persist";
import treatmentPlanReducer from "./slice/treatmentPlanSlice";
import treatmentTypeReducer from "./slice/treatmentTypeSlice";
import testTypeReducer from "./slice/testTypeSlice";
import fileReducer from "./slice/fileSlice";

const authPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['currentUser', 'accessToken', 'isAuthenticated'],
}

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    treatmentPlans: treatmentPlanReducer,
    appointments: appointmentReducer,
    assessments: assessmentReducer,
    clients: clientReducer,
    employees: employeeReducer,
    files: fileReducer,
    schools: schoolReducer,
    treatmentTypes: treatmentTypeReducer,
    testTypes: testTypeReducer,
  },
  // middleware
});
export const persistor = persistStore(store);
