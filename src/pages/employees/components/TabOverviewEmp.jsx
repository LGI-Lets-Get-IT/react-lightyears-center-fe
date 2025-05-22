// import React from "react";

const empInfoData = [
  { label: "Full Name", key: "fullName" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Email", key: "email" },
  { label: 'Role', key: 'roleName' },
  { label: "Active Status", key: "isActive" },
];

const TabOverviewContent = ({ employeeInformation }) => {
  return (
    <div
      className="tab-pane fade show active p-4"
      id="overviewTab"
      role="tabpanel"
    >
      <div className="profile-details mb-5">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0">Employee Information:</h5>
        </div>
        {empInfoData.map((item, index) => {
          return (
            <div
              key={index}
              className={`row g-0 ${index === empInfoData.length - 1 ? "mb-0" : "mb-4"
                }`}
            >
              {console.log('employeeInformation?.[item.key]', employeeInformation?.['roleId'])}
              <div className="col-sm-6 text-muted">{item.label}:</div>
              <div className="col-sm-6 fw-semibold">
                {item.key === 'isActive' ? employeeInformation?.isActive ? 'Active' : 'Inactive' : employeeInformation?.[item.key]}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default TabOverviewContent;
