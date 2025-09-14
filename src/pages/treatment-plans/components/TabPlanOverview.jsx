import React from "react";
import { FiArrowRight, FiCheck, FiFileText } from "react-icons/fi";
import { useSelector } from "react-redux";

const TabPlanOverview = () => {
  const { plan } = useSelector((state) => state.treatmentPlans);

  return (
    <div className="tab-pane fade active show" id="overviewTab">
      <div className="row">
        <div className="">
          <div className="card">
            <div className="card-body">
              <h5 className="fw-bold mb-0">
                <span className="d-block mb-2">Plan Information :</span>
                <span className="fs-12 fw-normal text-muted d-block">
                  Information regarding the treatment plans
                </span>
              </h5>
              <div className="card-header">
                <div className="w-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <a className="fs-12 fw-medium text-muted">
                      <span className="text-truncate-1-line">
                        Treatment Programs In Progress{" "}
                      </span>
                    </a>
                    <div className="ms-3">
                      <span className="fs-12 text-muted text-truncate-1-line">
                        {plan?.programsDone}/{plan?.totalPrograms} Programs
                        Completed{" "}
                        <span className="fs-11 text-muted">
                          ({(plan?.programsDone / plan?.totalPrograms) * 100}
                          %)
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="progress mt-2 ht-5">
                    <div
                      className={`progress-bar ${
                        (plan?.programsDone / plan?.totalPrograms) * 100 < 100
                          ? "bg-primary"
                          : "bg-success"
                      }`}
                      role="progressbar"
                      style={{
                        width: `${
                          (plan?.programsDone / plan?.totalPrograms) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label">Client Name</label>
                  <p>{plan?.client?.fullName}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Guardian Contact </label>
                  <p>
                    {plan?.client?.guardianName} -{" "}
                    <a
                      className="fw-normal"
                      href={`tel:${plan?.client?.guardianPhone}`}
                    >
                      {plan?.client?.guardianPhone}
                    </a>
                  </p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Consultation Date</label>
                  <p>{plan?.consultDate}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Psychologist Name</label>
                  <p>{plan?.psychologist?.fullName}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Total Programs </label>
                  <p>{plan?.totalPrograms} Programs</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Total Target Behaviors </label>
                  <p>{plan?.totalTargets} Behaviors</p>
                </div>
                <hr />
                <div className="col-md-12">
                  <label className="form-label">Present Problem</label>
                  <p>{plan?.presentProblem}</p>
                </div>
                <hr />
                <div className="col-md-12">
                  <label className="form-label">
                    Parent Collaboration Plan
                  </label>
                  <p>{plan?.parentPlan}</p>
                </div>
              </div>
              <hr />
              <div className="col-md-12">
                <label className="form-label">Programs</label>
              </div>
              <ul className="list-unstyled text-muted mb-0">
                {plan?.programs?.length > 0 &&
                  plan?.programs?.map(
                    ({
                      id,
                      treatmentName,
                      sessionDuration,
                      remainingSession,
                      sessionFrequency,
                      therapistName,
                      aimOfTreatment,
                      isCompleted,
                    }) => {
                      return (
                        <li key={id} className="d-flex align-items-start mb-3">
                          <span
                            className={`avatar-text avatar-sm ${
                              isCompleted
                                ? "bg-soft-success text-success"
                                : "bg-gray-100"
                            } me-3`}
                          >
                            <FiCheck className="fs-10" />
                          </span>
                          <span>
                            {treatmentName} - {sessionDuration} minutes (
                            {remainingSession} of {sessionFrequency} sessions
                            completed) - {therapistName} -{" "}
                            <strong>Goal:</strong> {aimOfTreatment}
                          </span>
                        </li>
                      );
                    }
                  )}
              </ul>
              <hr />
              <div className="col-md-12">
                <label className="form-label">Targeted Behaviors</label>
              </div>
              <div
                className="accordion proposal-faq-accordion"
                id="accordionFaqGroup"
              >
                {plan?.targets?.length > 0 &&
                  plan?.targets?.map(
                    ({
                      id,
                      targetBehavior,
                      currentAbility,
                      shortTermTarget,
                      longTermTarget,
                      mediaTools,
                    }) => {
                      return (
                        <AccordionItem
                          key={id}
                          id={id}
                          header={targetBehavior}
                          currentAbility={currentAbility}
                          shortTermTarget={shortTermTarget}
                          longTermTarget={longTermTarget}
                          mediaTools={mediaTools}
                        />
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabPlanOverview;

const AccordionItem = ({ id, header, ...content }) => {
  return (
    <div className="accordion-item" style={{ borderWidth: "3px" }}>
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
