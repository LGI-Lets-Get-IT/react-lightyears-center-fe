// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import EmployeesEditHeader from "./components/EmployeesEditHeader";
import EmployeesEditContent from "./components/EmployeesEditContent";
const EmployeesEdit = () => {
  return (
    <>
      <PageHeader>
        <EmployeesEditHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <EmployeesEditContent />
        </div>
      </div>
    </>
  );
};

export default EmployeesEdit;
