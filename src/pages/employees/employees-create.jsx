// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import EmployeeCreateContent from "./components/EmployeeCreateContent";

const EmployeesCreate = () => {
  return (
    <>
      <PageHeader>
        {/* <ClientsCreateHeader /> */}
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <EmployeeCreateContent />
        </div>
      </div>
    </>
  );
};

export default EmployeesCreate;
