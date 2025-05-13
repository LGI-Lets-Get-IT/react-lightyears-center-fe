import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import PlanCreateContent from "./components/PlanCreateContent";

const PlansCreate = () => {
  return (
    <>
      <PageHeader />
      <div className="main-content">
        <div className="row">
          <PlanCreateContent />
        </div>
      </div>
    </>
  );
};

export default PlansCreate;
