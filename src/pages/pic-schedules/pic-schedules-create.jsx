// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
// import AppointmentCreateHeader from "@/components/AppointmentCreateHeader";
import PICSchedulesCreateContent from "./components/PICScheduleCreateContent";

const PICSchedulesCreate = () => {
  return (
    <>
      <PageHeader>
        {/* <AppointmentCreateHeader /> */}
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <PICSchedulesCreateContent />
        </div>
      </div>
    </>
  );
};

export default PICSchedulesCreate;
