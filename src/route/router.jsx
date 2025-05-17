import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import "../index.css";
import RootLayout from "@/layout/root";
import ErrorMinimal from "@/pages/error-minimal";
import ProtectedRoute from "./ProtectedRoute";
import { PERMISSIONS } from "../shared/permissionsConstant";
import PlansEdit from "@/pages/treatment-plans/plans-edit";
const AssessmentsCreate = lazy(() => import("@/pages/assessments/assessments-create"));
const AssessmentsEdit = lazy(() => import("@/pages/assessments/assessments-edit"));
const AssessmentsList = lazy(() => import("@/pages/assessments/assessments-list"));
const AssessmentsView = lazy(() => import("@/pages/assessments/assessments-view"));
const TreatmentTypesList = lazy(() => import("@/pages/treatment-types/treatment-types-list"));
const TestTypesList = lazy(() => import("@/pages/test-types/test-types-list"));
const TestTypesCreate = lazy(() => import("@/pages/test-types/test-types-create"));
const TreatmentTypesCreate = lazy(() => import("@/pages/treatment-types/treatment-types-create"));
const EmployeesList = lazy(() => import("@/pages/employees/employees-list"));
const EmployeesEdit = lazy(() => import("@/pages/employees/employees-edit"));
const EmployeesView = lazy(() => import("@/pages/employees/employees-view"));

const PlansList = lazy(() => import("@/pages/treatment-plans/plans-list"));
const PlansView = lazy(() => import("@/pages/treatment-plans/plans-view"));
const PlansCreate = lazy(() => import("@/pages/treatment-plans/plans-create"));

const Analytics = lazy(() => import("@/pages/analytics"));
const ReportsSales = lazy(() => import("@/pages/reports-sales"));
const ReportsLeads = lazy(() => import("@/pages/reports-leads"));
const ReportsProject = lazy(() => import("@/pages/reports-project"));
const AppsChat = lazy(() => import("@/pages/apps-chat"));
const LayoutApplications = lazy(() => import("@/layout/layoutApplications"));
const AppsEmail = lazy(() => import("@/pages/apps-email"));
const ReportsTimesheets = lazy(() => import("@/pages/reports-timesheets"));
const LoginCover = lazy(() => import("@/pages/login-cover"));
const AppsTasks = lazy(() => import("@/pages/apps-tasks"));
const AppsNotes = lazy(() => import("@/pages/apps-notes"));
const AppsCalender = lazy(() => import("@/pages/apps-calender"));
const AppsStorage = lazy(() => import("@/pages/apps-storage"));
const Proposalist = lazy(() => import("@/pages/proposal-list"));
const ProposalView = lazy(() => import("@/pages/proposal-view"));
const ProposalEdit = lazy(() => import("@/pages/proposal-edit"));
const LeadsList = lazy(() => import("@/pages/leadsList"));
const ProposalCreate = lazy(() => import("@/pages/proposal-create"));
const LeadsView = lazy(() => import("@/pages/leads-view"));
const LeadsCreate = lazy(() => import("@/pages/leads-create"));
const PaymentList = lazy(() => import("@/pages/payment-list"));
const PaymentView = lazy(() => import("@/pages/payment-view/"));
const PaymentCreate = lazy(() => import("@/pages/payment-create"));
const ProjectsList = lazy(() => import("@/pages/projects-list"));
const ProjectsView = lazy(() => import("@/pages/projects-view"));
const ProjectsCreate = lazy(() => import("@/pages/projects-create"));
const SettingsGaneral = lazy(() => import("@/pages/settings-ganeral"));
const LayoutSetting = lazy(() => import("@/layout/layoutSetting"));
const SettingsSeo = lazy(() => import("@/pages/settings-seo"));
const SettingsTags = lazy(() => import("@/pages/settings-tags"));
const SettingsEmail = lazy(() => import("@/pages/settings-email"));
const SettingsTasks = lazy(() => import("@/pages/settings-tasks"));
const SettingsLeads = lazy(() => import("@/pages/settings-leads"));
const SettingsMiscellaneous = lazy(() =>
  import("@/pages/settings-miscellaneous")
);
const SettingsRecaptcha = lazy(() => import("@/pages/settings-recaptcha"));
const SettingsLocalization = lazy(() =>
  import("@/pages/settings-localization")
);
const SettingsCustomers = lazy(() => import("@/pages/settings-customers"));
const SettingsGateways = lazy(() => import("@/pages/settings-gateways"));
const SettingsFinance = lazy(() => import("@/pages/settings-finance"));
const SettingsSupport = lazy(() => import("@/pages/settings-support"));
const LayoutAuth = lazy(() => import("@/layout/layoutAuth"));
const LoginMinimal = lazy(() => import("@/pages/login-minimal"));
const LoginCreative = lazy(() => import("@/pages/login-creative"));
const RegisterCover = lazy(() => import("@/pages/register-cover"));
const RegisterMinimal = lazy(() => import("@/pages/register-minimal"));
const RegisterCreative = lazy(() => import("@/pages/register-creative"));
const ResetCover = lazy(() => import("@/pages/reset-cover"));
const ResetMinimal = lazy(() => import("@/pages/reset-minimal"));
const ResetCreative = lazy(() => import("@/pages/reset-creative"));
const ErrorCover = lazy(() => import("@/pages/error-cover"));
const ErrorCreative = lazy(() => import("@/pages/error-creative"));
const OtpCover = lazy(() => import("@/pages/otp-cover"));
const OtpMinimal = lazy(() => import("@/pages/otp-minimal"));
const OtpCreative = lazy(() => import("@/pages/otp-creative"));
const MaintenanceCover = lazy(() => import("@/pages/maintenance-cover"));
const MaintenanceMinimal = lazy(() => import("@/pages/maintenance-minimal"));
const MaintenanceCreative = lazy(() => import("@/pages/maintenance-creative"));
const WidgetsLists = lazy(() => import("@/pages/widgets-lists"));
const WidgetsTables = lazy(() => import("@/pages/widgets-tables"));
const WidgetsCharts = lazy(() => import("@/pages/widgets-charts"));
const WidgetsStatistics = lazy(() => import("@/pages/widgets-statistics"));

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
const SchoolsEdit = lazy(() => import('@/pages/schools/schools-edit'));
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
const WidgetsMiscellaneous = lazy(() =>
  import("@/pages/widgets-miscellaneous")
);

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
        path: '/assessments/:id/edit',
        element: (
          <AssessmentsEdit />
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
      {
        path: "/asdsa",
        element: <AppsTasks />,
      },
      // schools
      {
        path: "employees",
        element: <EmployeesList />,
      },
      {
        path: "employees/:id",
        element: <EmployeesView />,
      },
      {
        path: "employees/:id/edit",
        element: <EmployeesEdit />,
      },
      {
        path: "schools",
        element: <SchoolsList />,
      },
      {
        path: "test-types",
        element: <TestTypesList />,
      },
      {
        path: "test-types/create",
        element: <TestTypesCreate />,
      },
      {
        path: "treatment-types",
        element: <TreatmentTypesList />,
      },
      {
        path: "treatment-types/create",
        element: <TreatmentTypesCreate />,
      },
      // {
      //   path: "/settings",
      //   children: [
      //     {
      //       path: 'employees',
      //       element: <EmployeesList/>,
      //     },
      //     {
      //       path: "schools",
      //       element: <SchoolsList />,
      //     },
      //     {
      //       path: 'test-types',
      //       element: <TestTypesList/>
      //     },
      //     {
      //       path: 'test-types/create',
      //       element: <TestTypesCreate/>
      //     },
      //     {
      //       path: 'treatment-types',
      //       element: <TreatmentTypesList/>
      //     },
      //     {
      //       path: 'treatment-types/create',
      //       element: <TreatmentTypesCreate/>
      //     },
      //   ],
      // },
      // {
      //   path: "/settings/schools",
      //   element: <SchoolsList />,
      // },
      {
        path: "/schools/create",
        element: <SchoolsCreate />,
      },
      {
        path: "/schools/:id",
        element: <SchoolsView />,
      },
      {
        path: '/schools/:id/edit',
        element: <SchoolsEdit />,
      },
      // *
      // * The Light Years Routes END
      // *
      {
        path: "/dashboards/analytics",
        element: <Analytics />,
      },
      {
        path: "/reports/sales",
        element: <ReportsSales />,
      },
      {
        path: "/reports/leads",
        element: <ReportsLeads />,
      },
      {
        path: "/reports/project",
        element: <ReportsProject />,
      },
      {
        path: "/reports/timesheets",
        element: <ReportsTimesheets />,
      },
      {
        path: "/proposal/list",
        element: <Proposalist />,
      },
      {
        path: "/proposal/view",
        element: <ProposalView />,
      },
      {
        path: "/proposal/edit",
        element: <ProposalEdit />,
      },
      {
        path: "/proposal/create",
        element: <ProposalCreate />,
      },
      {
        path: "/payment/list",
        element: <PaymentList />,
      },
      {
        path: "/payment/view",
        element: <PaymentView />,
      },
      {
        path: "/payment/create",
        element: <PaymentCreate />,
      },
      {
        path: "/leads/list",
        element: <LeadsList />,
      },
      {
        path: "/leads/view",
        element: <LeadsView />,
      },
      {
        path: "/leads/create",
        element: <LeadsCreate />,
      },
      {
        path: "/projects/list",
        element: <ProjectsList />,
      },
      {
        path: "/projects/view",
        element: <ProjectsView />,
      },
      {
        path: "/projects/create",
        element: <ProjectsCreate />,
      },
      {
        path: "/widgets/lists",
        element: <WidgetsLists />,
      },
      {
        path: "/widgets/tables",
        element: <WidgetsTables />,
      },
      {
        path: "/widgets/charts",
        element: <WidgetsCharts />,
      },
      {
        path: "/widgets/statistics",
        element: <WidgetsStatistics />,
      },
      {
        path: "/widgets/miscellaneous",
        element: <WidgetsMiscellaneous />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutApplications />,
    children: [
      {
        path: "/applications/chat",
        element: <AppsChat />,
      },
      {
        path: "/applications/email",
        element: <AppsEmail />,
      },
      {
        path: "/applications/tasks",
        element: <AppsTasks />,
      },
      {
        path: "/applications/notes",
        element: <AppsNotes />,
      },
      {
        path: "/applications/calender",
        element: <AppsCalender />,
      },
      {
        path: "/applications/storage",
        element: <AppsStorage />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutSetting />,
    children: [
      {
        path: "/settings/ganeral",
        element: <SettingsGaneral />,
      },
      {
        path: "/settings/seo",
        element: <SettingsSeo />,
      },
      {
        path: "/settings/tags",
        element: <SettingsTags />,
      },
      {
        path: "/settings/email",
        element: <SettingsEmail />,
      },
      {
        path: "/settings/tasks",
        element: <SettingsTasks />,
      },
      {
        path: "/settings/leads",
        element: <SettingsLeads />,
      },
      {
        path: "/settings/Support",
        element: <SettingsSupport />,
      },
      {
        path: "/settings/finance",
        element: <SettingsFinance />,
      },
      {
        path: "/settings/gateways",
        element: <SettingsGateways />,
      },
      {
        path: "/settings/customers",
        element: <SettingsCustomers />,
      },
      {
        path: "/settings/localization",
        element: <SettingsLocalization />,
      },
      {
        path: "/settings/recaptcha",
        element: <SettingsRecaptcha />,
      },
      {
        path: "/settings/miscellaneous",
        element: <SettingsMiscellaneous />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      // {
      //   path: "/authentication/login/cover",
      //   element: <LoginCover />,
      // },
      {
        path: "/login",
        element: <LoginMinimal />,
      },
      // {
      //   path: "/authentication/login/creative",
      //   element: <LoginCreative />,
      // },
      {
        path: "/authentication/register/cover",
        element: <RegisterCover />,
      },
      {
        path: "/authentication/register/minimal",
        element: <RegisterMinimal />,
      },
      // {
      //   path: "/authentication/register/creative",
      //   element: <RegisterCreative />,
      // },
      // {
      //   path: "/authentication/reset/cover",
      //   element: <ResetCover />,
      // },
      {
        path: "/authentication/reset/minimal",
        element: <ResetMinimal />,
      },
      // {
      //   path: "/authentication/reset/creative",
      //   element: <ResetCreative />,
      // },
      // {
      //   path: "/authentication/404/cover",
      //   element: <ErrorCover />,
      // },
      {
        path: "/authentication/404/minimal",
        element: <ErrorMinimal />,
      },
      // {
      //   path: "/authentication/404/creative",
      //   element: <ErrorCreative />,
      // },
      // {
      //   path: "/authentication/verify/cover",
      //   element: <OtpCover />,
      // },
      {
        path: "/authentication/verify/minimal",
        element: <OtpMinimal />,
      },
      // {
      //   path: "/authentication/verify/creative",
      //   element: <OtpCreative />,
      // },
      // {
      //   path: "/authentication/maintenance/cover",
      //   element: <MaintenanceCover />,
      // },
      {
        path: "/authentication/maintenance/minimal",
        element: <MaintenanceMinimal />,
      },
      // {
      //   path: "/authentication/maintenance/creative",
      //   element: <MaintenanceCreative />,
      // },
    ],
  },
]);
