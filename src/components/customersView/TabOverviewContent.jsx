// import React from "react";
// import { FiAlertTriangle } from "react-icons/fi";
// import { projectsData } from "@/utils/data/projectsData";
// import ImageGroup from "@/components/shared/ImageGroup";
// import HorizontalProgress from "@/components/shared/HorizontalProgress";

import format from "date-fns/format";
import { FaEye } from "react-icons/fa";

const childInfoData = [
  { label: "Full Name", key: "fullName" },
  { label: "Age", key: "age", suffix: " old" },
  { label: "Date of Birth", key: "dateOfBirth" },
  { label: "Nationality", key: "nationality" },
  { label: "School Name", key: "schoolName" },
];

const parentInfoData = [
  { label: "Guardian Name", key: "guardianName" },
  { label: "Guardian Phone", key: "guardianPhone" },
  { label: "Guardian Nationality", key: "guardianNationality" },
  { label: "Relationship With Child", key: "guardianRelationship" },
];

const intakeFormData = [
  { label: "Place of Birth", key: "placeOfBirth" },
  { label: "Religion", key: "religion" },
  { label: "Home Address", key: "homeAddress" },
  { label: "Previous Ongoing Activity", key: "previousOngoingActivity" },
  {
    label: "What are your major reasons or concerns about your child",
    key: "majorReasonConcerns",
  },
  {
    label:
      "Have you previously met a psychologist/psychiatrist before? If yes, please explain",
    key: "previousPsychologicalDetails",
  },
  {
    label: "Ability to get along with others and control emotions?",
    key: "socialAbilities",
  },
  {
    label:
      "Forms caring, supportive relationships with family members, other adults, and peers?",
    key: "relationshipAbilities",
  },
  {
    label:
      "Chooses to eat healthy foods, and participate in physical activity everyday?",
    key: "healthAbilities",
  },
  { label: "Can solve simple maths?", key: "mathAbilities" },
  {
    label:
      "What is your expectation(s) for the current developmental programs?",
    key: "programsExpectations",
  },
  {
    label: "Where did you hear about The Light Years Child Development Center?",
    key: "howHeardAboutUs",
  },
  {
    label: "What is your child's birth order compared to their siblings?",
    key: "childBirthOrder",
  },
];
const TabOverviewContent = ({ clientInformation }) => {
  return (
    <div
      className="tab-pane fade show active p-4"
      id="overviewTab"
      role="tabpanel"
    >
      <div className="profile-details mb-5">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0">Child Information</h5>
          {/* <a href="#" className="btn btn-sm btn-light-brand gap-1">
            <FaPencil /> Edit Information
          </a> */}
        </div>
        {childInfoData.map((item, index) => (
          <div
            key={index}
            className={`row g-0 ${
              index === childInfoData.length - 1 ? "mb-0" : "mb-4"
            }`}
          >
            <div className="col-sm-6 text-muted">{item.label}:</div>
            <div className="col-sm-6 fw-semibold">
              {clientInformation?.[item.key]} {item?.suffix}
            </div>
          </div>
        ))}
      </div>
      <div className="profile-details mb-5">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0">Guardian Information</h5>
          {/* <a href="#" className="btn btn-sm btn-light-brand gap-1">
            <FaPencil /> Edit Information
          </a> */}
        </div>
        {parentInfoData.map((item, index) => (
          <div
            key={index}
            className={`row g-0 ${
              index === parentInfoData.length - 1 ? "mb-0" : "mb-4"
            }`}
          >
            <div className="col-sm-6 text-muted">{item.label}:</div>
            <div className="col-sm-6 fw-semibold">
              {clientInformation?.[item.key]}
            </div>
          </div>
        ))}
      </div>
      <div className="profile-details mb-5">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0">Client Intake Form Information</h5>
        </div>

        <div className="row g-0 mb-4">
          <div className="col-sm-6 text-muted">Google Form Link</div>
          <div className="col-sm-2">
            <a
              target="_blank"
              href={clientInformation?.intakeFormLink}
              className="btn btn-primary"
            >
              <FaEye size={12} className="me-2" />
              <span>View Form</span>
            </a>
          </div>
        </div>
      </div>
      {/* {intakeFormData.map((item, index) => (
          <div
            key={index}
            className={`row g-0 ${index === intakeFormData.length - 1 ? "mb-0" : "mb-4"
              }`}
          >
            <div className="col-sm-6 text-muted">{item.label}:</div>
            <div className="col-sm-6 fw-semibold">
              {clientInformation?.clientDetails?.[item.key] || '-'}
            </div>
          </div>
        ))}
        <div className="row g-0 mt-4">
          <div className="col-sm-6 text-muted">Institutions:</div>
          <div className="col-sm-6 fw-semibold">
            <div className="accordion proposal-faq-accordion">
              {clientInformation?.clientDetails?.institutionsData ?
                clientInformation?.clientDetails?.institutionsData.map(
                  (institution, index) => (
                    <AccordionItem
                      key={index}
                      id={`institutions-${index}`}
                      header={`Institution ${index + 1}`}
                    >
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Institution Name{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-6 fw-semibold">
                            {institution.institutionName || '-'}
                        </div>
                      </div>

                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Age <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          {institution.age || '-'} years old
                        </div>
                      </div>

                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Activity{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          {institution.activity || '-'}
                        </div>
                      </div>
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Duration{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          {institution.duration || '-'}
                        </div>
                      </div>
                    </AccordionItem>
                  )
                ) : (
                  <span>-</span>
                )}
            </div>
          </div>
        </div>
        <div className="row g-0 mt-4">
          <div className="col-sm-6 text-muted">Guardians:</div>
          <div className="col-sm-6 fw-semibold">
            <div className="accordion proposal-faq-accordion">
              {clientInformation?.clientDetails?.guardiansData ?
                clientInformation?.clientDetails?.guardiansData.map(
                  (guardian, index) => (
                    <AccordionItem
                      key={index}
                      id={`guardians-${index}`}
                      header={`Guardian ${index + 1}`}
                    >
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Guardian Name{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-6 fw-semibold">
                            {guardian.guardianName || '-'}
                        </div>
                      </div>

                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Place of Birth{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          {guardian.placeOfBirth || '-'}
                        </div>
                      </div>
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Date Of Birth{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          {format(guardian.dateOfBirth, 'dd MMM yyyy') || '-'}
                        </div>
                      </div>
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Gender{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          {guardian.gender || '-'}
                        </div>
                      </div>
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Education{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          {guardian.education || '-'}
                        </div>
                      </div>
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Job{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          {guardian.job || '-'}
                        </div>
                      </div>
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Relationship to Child <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          {guardian.relationship || '-'}
                        </div>
                      </div>
                    </AccordionItem>
                  )
                ) : (
                  <span>-</span>
                )}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TabOverviewContent;

const AccordionItem = ({ id, header, children }) => {
  return (
    <div className="accordion-item">
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
        <div className="accordion-body p-3 rounded">{children}</div>
      </div>
    </div>
  );
};
