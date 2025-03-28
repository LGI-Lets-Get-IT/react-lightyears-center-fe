// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import AppointmentCreateHeader from "./components/AppointmentCreateHeader";
import AppointmentCreateContent from "./components/AppointmentCreateContent";

const AppointmentsCreate = () => {
  return (
    <>
      <PageHeader>
        <AppointmentCreateHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <AppointmentCreateContent />
        </div>
      </div>
    </>
  );
};

export default AppointmentsCreate;
