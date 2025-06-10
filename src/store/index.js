import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import appointmentReducer from "./slice/appointmentSlice";
import assessmentReducer from "./slice/assessmentSlice";
import clientReducer from "./slice/clientSlice";
import employeeReducer from "./slice/employeeSlice";
import schoolReducer from "./slice/schoolSlice";
import authReducer from './slice/authSlice';
import profileReducer from './slice/profileSlice';
import treatmentPlanReducer from "./slice/treatmentPlanSlice";
import treatmentSessionReducer from "./slice/treatmentSessionSlice";
import treatmentTypeReducer from "./slice/treatmentTypeSlice";
import testTypeReducer from "./slice/testTypeSlice";
import fileReducer from "./slice/fileSlice";
import dashboardReducer from "./slice/dashboardSlice";

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
    treatmentPlans: treatmentPlanReducer,
    treatmentSessions: treatmentSessionReducer,
    appointments: appointmentReducer,
    assessments: assessmentReducer,
    clients: clientReducer,
    employees: employeeReducer,
    files: fileReducer,
    schools: schoolReducer,
    treatmentTypes: treatmentTypeReducer,
    testTypes: testTypeReducer,
    profile: profileReducer,
    dashboard: dashboardReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  // middleware
});

export const persistor = persistStore(store);
