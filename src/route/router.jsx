import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import "../index.css";
import RootLayout from "@/layout/root";
import ErrorMinimal from "@/pages/error-minimal";
import PlansList from "@/pages/treatment-plans/plans-list";
import PlansView from "@/pages/treatment-plans/plans-view";
import ProtectedRoute from "./ProtectedRoute";
import { PERMISSIONS } from "../shared/permissionsConstant";

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
const HelpKnowledgebase = lazy(() => import("@/pages/help-knowledgebase"));
const WidgetsLists = lazy(() => import("@/pages/widgets-lists"));
const WidgetsTables = lazy(() => import("@/pages/widgets-tables"));
const WidgetsCharts = lazy(() => import("@/pages/widgets-charts"));
const WidgetsStatistics = lazy(() => import("@/pages/widgets-statistics"));

// *
// * The Light Years Routes START
// *
const Home = lazy(() => import("@/pages/dashboard/home"));

const CustomersView = lazy(() => import("@/pages/clients/clients-view"));
const CustomersCreate = lazy(() => import("@/pages/clients/clients-create"));
const CustomersList = lazy(() => import("@/pages/clients/clients-list"));
const CustomersEdit = lazy(() => import("@/pages/clients/clients-edit"));

const SchoolsList = lazy(() => import("@/pages/schools/schools-list"));
const SchoolsView = lazy(() => import("@/pages/schools/schools-view"));
const SchoolsCreate = lazy(() => import("@/pages/schools/schools-create"));

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
        {/* <ProtectedRoute> */}
          <RootLayout />
        {/* </ProtectedRoute> */}
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
        element: <ProtectedRoute requiredPermissions={PERMISSIONS.APPOINTMENTS.VIEW}>
          <AppointmentsList/>
        </ProtectedRoute>,
      },
      {
        path: "/appointments/:id",
        element: <ProtectedRoute requiredPermissions={PERMISSIONS.APPOINTMENTS.VIEW}>
          <AppointmentsView/>
        </ProtectedRoute>,
      },
      {
        path: "/appointments/create",
        element: <ProtectedRoute requiredPermissions={PERMISSIONS.APPOINTMENTS.CREATE}>
          <AppointmentsCreate/>
        </ProtectedRoute>,
      },

      // clients
      {
        path: "/clients",
        element: <ProtectedRoute requiredPermissions={PERMISSIONS.CLIENTS.VIEW}>
          <CustomersList />
        </ProtectedRoute>,
      },
      {
        path: "/clients/:uuid",
        element: <ProtectedRoute requiredPermissions={PERMISSIONS.CLIENTS.VIEW}>
          <CustomersView />
        </ProtectedRoute>,
      },
      {
        path: "/clients/:uuid/edit",
        element: <ProtectedRoute requiredPermissions={PERMISSIONS.CLIENTS.UPDATE}>
          <CustomersEdit />
        </ProtectedRoute>,
      },
      {
        path: "/clients/create",
        element: <ProtectedRoute requiredPermissions={PERMISSIONS.CLIENTS.CREATE}>
          <CustomersCreate />
        </ProtectedRoute>,
      },
      {
        path: '/treatment-plans',
        element: <ProtectedRoute requiredPermissions={PERMISSIONS.TREATMENT_PLANS.VIEW}>
          <PlansList/>
        </ProtectedRoute>,
      },
      {
        path: '/treatment-plans/:id',
        element: <ProtectedRoute requiredPermissions={PERMISSIONS.TREATMENT_PLANS.VIEW}>
          <PlansView/>
        </ProtectedRoute>,
      },
      // schools
      {
        path: "/settings",
        children: [
          {
            path: "schools",
            element: <SchoolsList />,
          },
        ],
      },
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
      {
        path: "/help/knowledgebase",
        element: <HelpKnowledgebase />,
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
