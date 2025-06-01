import AppointmentsTable from "./components/AppointmentsTable";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import AppointmentsHeader from "./components/AppointmentsHeader";

const AppointmentsList = () => {
  return (
    <>
      <PageHeader>
        <AppointmentsHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <AppointmentsTable />
        </div>
      </div>
    </>
  );
};

export default AppointmentsList;
