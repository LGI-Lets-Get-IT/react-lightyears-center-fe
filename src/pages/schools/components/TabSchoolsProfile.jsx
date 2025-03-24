import React from "react";
import getIcon from "@/utils/getIcon";

const generalInfoData = [
  {
    title: "Status",
    icon: "feather-git-commit",
    text: "Customer",
  },
  {
    title: "Source",
    icon: "feather-facebook",
    text: "Facebook",
  },
  {
    title: "Default Language",
    icon: "feather-airplay",
    text: "System Default",
  },
  {
    title: "Privacy",
    icon: "feather-globe",
    text: "Private",
  },
  {
    title: "Created",
    icon: "feather-clock",
    text: "26 MAY, 2023",
  },
  {
    title: "Assigned",
    image: "/images/avatar/1.png",
    text: "Alexandra Della",
  },
  {
    title: "Lead By",
    image: "/images/avatar/5.png",
    text: "Green Cute - Website design and development",
  },
];

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
];

const TabSchoolsProfile = ({ schoolInformation }) => {
  return (
    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
      <div className="card card-body lead-info">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0">
            <span className="d-block mb-2">School Information :</span>
            <span className="fs-12 fw-normal text-muted d-block">
              Following information for your lead
            </span>
          </h5>
        </div>
        {schoolInfoData.map((data, index) => (
          <Card
            key={index}
            title={data.title}
            content={schoolInformation?.[data.key]}
          />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default TabSchoolsProfile;

const Card = ({ title, content }) => {
  return (
    <div className="row mb-4">
      <div className="col-lg-2 fw-medium">{title}</div>
      <div className="col-lg-10">{content}</div>
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
