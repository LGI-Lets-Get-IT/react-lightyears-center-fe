// import React from "react";
import TabOverviewEmp from "./TabOverviewEmp";
import Profile from "./Profile";

const EmployeeDetailContent = ({ employeeData }) => {
  return (
    <>
      <div className="col-xxl-4 col-xl-6">
        <Profile
          id={employeeData?.id} // Changed from uuid to id
          fullName={employeeData?.fullName}
          phoneNumber={employeeData?.phoneNumber}
          email={employeeData?.email}
          isActive={employeeData?.isActive}
          createdAt={employeeData?.createdAt}
        />
      </div>
      <div className="col-xxl-8 col-xl-6">
        <div className="card border-top-0">
          <div className="card-header p-0"></div>
          <div className="tab-content">
            <TabOverviewEmp employeeInformation={employeeData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetailContent;
