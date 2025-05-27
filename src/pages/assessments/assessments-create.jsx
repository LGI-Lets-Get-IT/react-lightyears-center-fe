// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
// import AppointmentCreateHeader from "@/components/AppointmentCreateHeader";
import AssessmentsCreateContent from "./components/AssessmentsCreateContent";

const AssessmentsCreate = () => {
  return (
    <>
      <PageHeader>
        {/* <AppointmentCreateHeader /> */}
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <AssessmentsCreateContent />
        </div>
      </div>
    </>
  );
};

export default AssessmentsCreate;
