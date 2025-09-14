import React from "react";
import getIcon from "@/utils/getIcon";

const schoolInfoData = [
  {
    title: "School Name",
    key: "name",
  },
  {
    title: "School Address",
    key: "address",
  },
  {
    title: "School Phone Number",
    key: "phoneNumber",
  },
  {
    title: "School Email",
    key: "email",
  },
  {
    title: "PIC Name",
    key: "picFullName",
  },
  {
    title: "PIC Phone Number",
    key: "picPhoneNumber",
  },
  {
    title: "PIC Email",
    key: "picEmail",
  },
  // {
  //   title: "Active Status",
  //   key: "isActive",
  // },
];

const TabSchoolsProfile = ({ schoolInformation }) => {
  return (
    <div className="card card-body lead-info">
      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h5 className="fw-bold mb-0">
          <span className="d-block mb-2">School Information :</span>
          <span className="fs-12 fw-normal text-muted d-block">
            Following information for your lead
          </span>
        </h5>
      </div>
      {schoolInfoData.map((data, index) => {
        const content = schoolInformation?.[data.key];
        // const content =
        //   data.key === "isActive"
        //     ? schoolInformation?.isActive
        //       ? "Active"
        //       : "Inactive"
        //     : schoolInformation?.[data.key];
        return <Card key={index} title={data.title} content={content} />;
      })}
    </div>
  );
};

export default TabSchoolsProfile;

const Card = ({ title, content }) => {
  return (
    <div className="row mb-4">
      <div className="col-lg-2 fw-medium">{title || "-"}</div>
      <div className="col-lg-10 fw-bold">{content || "-"}</div>
    </div>
  );
};

const GeneralCard = ({ title, icon, text, image }) => {
  return (
    <div className="row mb-4">
      <div className="col-lg-2 fw-medium">{title}</div>
      <div className="col-lg-10 hstack gap-1">
        <a href="#" className="hstack gap-2">
          {icon && <div className="avatar-text avatar-sm">{getIcon(icon)}</div>}
          {image && (
            <div className="avatar-image avatar-sm">
              <img src={image} alt="" className="img-fluid" />
            </div>
          )}
          <span>{text}</span>
        </a>
      </div>
    </div>
  );
};
