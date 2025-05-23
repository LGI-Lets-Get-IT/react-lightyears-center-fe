import React from "react";
import { format } from "date-fns";
import { FiArrowRight, FiFileText } from "react-icons/fi";

const TabAssessmentOverview = ({ assessmentData }) => {
  return (
    <div className="tab-pane fade active show" id="overviewTab">
      <div className="row">
        <div className="">
          <div className="card">
            <div className="card-body">
              <h5 className="fw-bold mb-0">
                <span className="d-block mb-2">Assessment Information :</span>
                <span className="fs-12 fw-normal text-muted d-block">
                  Information regarding the client assessment
                </span>
              </h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label">Client Name</label>
                    <p>{assessmentData?.client?.fullName ?? "-"}</p>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label">Psychologist Name</label>
                    <p>{assessmentData?.psychologist?.fullName ?? "-"}</p>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label">Test Name</label>
                    <p>{assessmentData?.testType?.name ?? "-"}</p>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label">Assessed On</label>
                    <a
                      className="d-flex fw-normal"
                      href={`/appointments/${assessmentData?.appointment?.id}`}
                    >
                      [{assessmentData?.appointment?.appointmentType ?? "-"}]{" "}
                      {assessmentData?.appointment?.title ?? "-"}
                    </a>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label">Assessment Date</label>
                    <p>
                      {assessmentData?.createdAt
                        ? format(assessmentData.createdAt, "dd MMM yyyy")
                        : "-"}
                    </p>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Test Result</label>
                    <p>{assessmentData?.result ?? "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabAssessmentOverview;

const AccordionItem = ({ id, header, ...content }) => {
  return (
    <div className="accordion-item">
      {console.log("content", content)}
      <h2 className="accordion-header" id={`flush-heading${id}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${id}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${id}`}
        >
          {header}
        </button>
      </h2>
      <div
        id={`flush-collapse${id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`flush-heading${id}`}
        data-bs-parent="#accordionFaqGroup"
      >
        <div className="accordion-body bg-light p-3 rounded">
          <p>
            💪 <strong>Current Ability:</strong>{" "}
            <span className="text-primary">{content.currentAbility}</span>
          </p>
          <p>
            🎯 <strong>Target:</strong> Grow to{" "}
            <span className="text-success">{content.shortTermTarget}</span>{" "}
            soon, aiming for{" "}
            <span className="text-warning">{content.longTermTarget}</span> in
            the long run.
          </p>
          <p>
            🛠️ <strong>Tools:</strong> {content.mediaTools}
          </p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon: Icon, title, link }) => {
  return (
    <div className="card border border-gray-2 rounded-2 my-2 overflow-hidden">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="wd-50 ht-50 bg-gray-100 me-3 d-flex align-items-center justify-content-center">
            {/* <Icon /> */}
            <FiFileText />
          </div>
          <a href={link}>{title}</a>
        </div>
        <a href={link} className="avatar-text avatar-sm me-3">
          <FiArrowRight />
        </a>
      </div>
    </div>
  );
};
