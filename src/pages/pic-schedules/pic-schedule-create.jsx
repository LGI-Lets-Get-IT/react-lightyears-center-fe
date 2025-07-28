import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import PICScheduleCreateContent from "./components/PICScheduleCreateContent";

const PICScheduleCreate = () => {
  return (
    <>
      <PageHeader />
      <div className="main-content">
        <div className="row">
          <PICScheduleCreateContent />
        </div>
      </div>
    </>
  );
};

export default PICScheduleCreate;
