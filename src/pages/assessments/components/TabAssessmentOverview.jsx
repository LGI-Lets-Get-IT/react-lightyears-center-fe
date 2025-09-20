import React from "react";
import { format } from "date-fns";

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

                  {assessmentData?.isInCenterAssessment && (
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
                  )}
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
