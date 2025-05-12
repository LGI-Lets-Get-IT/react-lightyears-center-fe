// import React from "react";
// import { FiAlertTriangle } from "react-icons/fi";
// import { projectsData } from "@/utils/data/projectsData";
// import ImageGroup from "@/components/shared/ImageGroup";
// import HorizontalProgress from "@/components/shared/HorizontalProgress";
import { FaPencil } from "react-icons/fa6";

const empInfoData = [
  { label: "Full Name", key: "fullName" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Email", key: "email" },
  { label: "Active Status", key: "isActive" },
  { label: "Created At", key: "createdAt" },
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
          {/* <a href="#" className="btn btn-sm btn-light-brand gap-1">
            <FaPencil /> Edit Information
          </a> */}
        </div>
        {empInfoData.map((item, index) => (
          <div
            key={index}
            className={`row g-0 ${
              index === empInfoData.length - 1 ? "mb-0" : "mb-4"
            }`}
          >
            <div className="col-sm-6 text-muted">{item.label}:</div>
            <div className="col-sm-6 fw-semibold">
              {employeeInformation?.[item.key]} {item?.suffix}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabOverviewContent;
