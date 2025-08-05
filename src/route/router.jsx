import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import "../index.css";
import RootLayout from "@/layout/root";
import ErrorMinimal from "@/pages/error-minimal";
import ProtectedRoute from "./ProtectedRoute";
import { PERMISSIONS } from "../shared/permissionsConstant";
import AppointmentsEdit from "@/pages/appointments/appointments-edit";
const PICSchedulesList = lazy(() =>
  import("@/pages/pic-schedules/pic-schedules-list")
);
const PICSchedulesView = lazy(() =>
  import("@/pages/pic-schedules/pic-schedules-view")
);
const PICSchedulesEdit = lazy(() =>
  import("@/pages/pic-schedules/pic-schedules-edit")
);
const PICSchedulesCreate = lazy(() =>
  import("@/pages/pic-schedules/pic-schedules-create")
);
const ChangePassword = lazy(() => import("@/pages/user/change-password"));
const PlansEdit = lazy(() => import("@/pages/treatment-plans/plans-edit"));
const UserProfile = lazy(() => import("@/pages/user/user-profile"));
const UserProfileEdit = lazy(() => import("@/pages/user/user-profile-edit"));
const TestTypesEdit = lazy(() => import("@/pages/test-types/test-types-edit"));
const TreatmentTypesEdit = lazy(() =>
  import("@/pages/treatment-types/treatment-types-edit")
);
const EmployeesCreate = lazy(() =>
  import("@/pages/employees/employees-create")
);
const AssessmentsCreate = lazy(() =>
  import("@/pages/assessments/assessments-create")
);
const AssessmentsEdit = lazy(() =>
  import("@/pages/assessments/assessments-edit")
);
const AssessmentsList = lazy(() =>
  import("@/pages/assessments/assessments-list")
);
const AssessmentsView = lazy(() =>
  import("@/pages/assessments/assessments-view")
);
const TreatmentTypesList = lazy(() =>
  import("@/pages/treatment-types/treatment-types-list")
);
const TestTypesList = lazy(() => import("@/pages/test-types/test-types-list"));
const TestTypesCreate = lazy(() =>
  import("@/pages/test-types/test-types-create")
);
const TreatmentTypesCreate = lazy(() =>
  import("@/pages/treatment-types/treatment-types-create")
);
const EmployeesList = lazy(() => import("@/pages/employees/employees-list"));
const EmployeesEdit = lazy(() => import("@/pages/employees/employees-edit"));
const EmployeesView = lazy(() => import("@/pages/employees/employees-view"));

const PlansList = lazy(() => import("@/pages/treatment-plans/plans-list"));
const PlansView = lazy(() => import("@/pages/treatment-plans/plans-view"));
const PlansCreate = lazy(() => import("@/pages/treatment-plans/plans-create"));
const LayoutAuth = lazy(() => import("@/layout/layoutAuth"));
const LoginMinimal = lazy(() => import("@/pages/login-minimal"));
const ResetMinimal = lazy(() => import("@/pages/reset-minimal"));
const MaintenanceMinimal = lazy(() => import("@/pages/maintenance-minimal"));

// *
// * The Light Years Routes START
// *
const Home = lazy(() => import("@/pages/dashboard/home"));

const ClientsView = lazy(() => import("@/pages/clients/clients-view"));
const ClientsCreate = lazy(() => import("@/pages/clients/clients-create"));
const ClientsList = lazy(() => import("@/pages/clients/clients-list"));
const ClientsEdit = lazy(() => import("@/pages/clients/clients-edit"));

const SchoolsList = lazy(() => import("@/pages/schools/schools-list"));
const SchoolsView = lazy(() => import("@/pages/schools/schools-view"));
const SchoolsCreate = lazy(() => import("@/pages/schools/schools-create"));
const SchoolsEdit = lazy(() => import("@/pages/schools/schools-edit"));
const AppointmentsList = lazy(() =>
  import("@/pages/appointments/appointments-list")
);
const AppointmentsView = lazy(() =>
  import("@/pages/appointments/appointments-view")
);
const AppointmentsCreate = lazy(() =>
  import("@/pages/appointments/appointments-create")
);

// *
// * The Light Years Routes END
// *
const LoadingFallback = () => {
  return (
    <div className="layout-preloader-container">
      <div className="layout-preloader">
        <span></span>
      </div>
    </div>
  );
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute requiredPermissions={PERMISSIONS.DASHBOARD.VIEW}>
          <RootLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    errorElement: <ErrorMinimal />,
    children: [
      // *
      // * The Light Years Routes START
      // *
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.PROFILE.VIEW}>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/edit",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.PROFILE.UPDATE}>
            <UserProfileEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/appointments",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.APPOINTMENTS.VIEW}>
            <AppointmentsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/appointments/:id",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.APPOINTMENTS.VIEW}>
            <AppointmentsView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/appointments/create",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.APPOINTMENTS.CREATE}>
            <AppointmentsCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/appointments/:id/edit",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.APPOINTMENTS.UPDATE}>
            <AppointmentsEdit />
          </ProtectedRoute>
        ),
      },

      // Assessments
      {
        path: "/assessments",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.ASSESSMENTS.VIEW}>
            <AssessmentsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/assessments/:id",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.ASSESSMENTS.VIEW}>
            <AssessmentsView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/assessments/create",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.ASSESSMENTS.CREATE}>
            <AssessmentsCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/assessments/:id/edit",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.ASSESSMENTS.UPDATE}>
            <AssessmentsEdit />
          </ProtectedRoute>
        ),
      },

      // clients
      {
        path: "/clients",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.CLIENTS.VIEW}>
            <ClientsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/clients/:uuid",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.CLIENTS.VIEW}>
            <ClientsView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/clients/:uuid/edit",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.CLIENTS.UPDATE}>
            <ClientsEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/clients/create",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.CLIENTS.CREATE}>
            <ClientsCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/treatment-plans",
        element: (
          <ProtectedRoute
            requiredPermissions={PERMISSIONS.TREATMENT_PLANS.VIEW}
          >
            <PlansList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/treatment-plans/:id",
        element: (
          <ProtectedRoute
            requiredPermissions={PERMISSIONS.TREATMENT_PLANS.VIEW}
          >
            <PlansView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/treatment-plans/:id/edit",
        element: (
          <ProtectedRoute
            requiredPermissions={PERMISSIONS.TREATMENT_PLANS.UPDATE}
          >
            <PlansEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/treatment-plans/create",
        element: (
          <ProtectedRoute
            requiredPermissions={PERMISSIONS.TREATMENT_PLANS.CREATE}
          >
            <PlansCreate />
          </ProtectedRoute>
        ),
      },
      // schools
      {
        path: "employees",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.EMPLOYEES.VIEW}>
            <EmployeesList />,
          </ProtectedRoute>
        ),
      },
      {
        path: "employees/create",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.EMPLOYEES.CREATE}>
            <EmployeesCreate />,
          </ProtectedRoute>
        ),
      },
      {
        path: "employees/:id",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.EMPLOYEES.VIEW}>
            <EmployeesView />,
          </ProtectedRoute>
        ),
      },
      {
        path: "employees/:id/edit",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.EMPLOYEES.EDIT}>
            <EmployeesEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee-schedules",
        element: (
          <ProtectedRoute>
            <PICSchedulesList />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee-schedules/:id",
        element: (
          <ProtectedRoute>
            <PICSchedulesView />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee-schedules/:id/edit",
        element: (
          <ProtectedRoute>
            <PICSchedulesEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee-schedules/create",
        element: (
          <ProtectedRoute>
            <PICSchedulesCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "schools",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.SCHOOLS.VIEW}>
            <SchoolsList />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/schools/create",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.SCHOOLS.CREATE}>
            <SchoolsCreate />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/schools/:id",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.SCHOOLS.VIEW}>
            <SchoolsView />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/schools/:id/edit",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.SCHOOLS.UPDATE}>
            <SchoolsEdit />,
          </ProtectedRoute>
        ),
      },
      {
        path: "test-types",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.TEST_TYPES.VIEW}>
            <TestTypesList />,
          </ProtectedRoute>
        ),
      },
      {
        path: "test-types/create",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.TEST_TYPES.CREATE}>
            <TestTypesCreate />,
          </ProtectedRoute>
        ),
      },
      {
        path: "test-types/:id/edit",
        element: (
          <ProtectedRoute requiredPermissions={PERMISSIONS.TEST_TYPES.UPDATE}>
            <TestTypesEdit />,
          </ProtectedRoute>
        ),
      },
      {
        path: "treatment-types",
        element: (
          <ProtectedRoute
            requiredPermissions={PERMISSIONS.TREATMENT_TYPES.VIEW}
          >
            <TreatmentTypesList />,
          </ProtectedRoute>
        ),
      },
      {
        path: "treatment-types/create",
        element: (
          <ProtectedRoute
            requiredPermissions={PERMISSIONS.TREATMENT_TYPES.CREATE}
          >
            <TreatmentTypesCreate />,
          </ProtectedRoute>
        ),
      },
      {
        path: "treatment-types/:id/edit",
        element: (
          <ProtectedRoute
            requiredPermissions={PERMISSIONS.TREATMENT_TYPES.UPDATE}
          >
            <TreatmentTypesEdit />,
          </ProtectedRoute>
        ),
      },
    ],
  },

  // *
  // * The Light Years Routes END
  // *
  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      {
        path: "/login",
        element: <LoginMinimal />,
      },
      // {
      //   path: "/authentication/register/minimal",
      //   element: <RegisterMinimal />,
      // },
      {
        path: "/forgot-password",
        element: <ResetMinimal />,
      },
      // {
      //   path: "/authentication/verify/minimal",
      //   element: <OtpMinimal />,
      // },
      {
        path: "/maintenance",
        element: <MaintenanceMinimal />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorMinimal />,
  },
]);
