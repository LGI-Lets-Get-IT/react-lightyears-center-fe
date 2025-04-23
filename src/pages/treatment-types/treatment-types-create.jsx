// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import TreatmentTypesCreateHeader from "./components/TreatmentTypesCreateHeader";
import TreatmentTypesCreateContent from "./components/TreatmentTypesCreateContent";

const TreatmentTypesCreate = () => {
  return (
    <>
      <PageHeader>
        <TreatmentTypesCreateHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <TreatmentTypesCreateContent />
        </div>
      </div>
    </>
  );
};

export default TreatmentTypesCreate;
