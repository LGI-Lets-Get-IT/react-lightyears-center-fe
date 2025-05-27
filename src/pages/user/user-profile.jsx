import SelectDropdown from "@/components/shared/SelectDropdown"; // Assuming you'll use this later for editable fields
import { useSelector } from "react-redux";
import { format } from "date-fns"; // For formatting dates

// --- Data Structures for Display ---

// Existing Child Info (some might move to intake, or be derived)
const childInfoData = [
  { label: "Full Name", key: "fullName" }, // This should probably stay in the main client table
  { label: "Age", key: "age", suffix: " old" }, // Can be derived from DOB or stored
  { label: "Date of Birth", key: "dateOfBirth", type: "date" }, // Main client
  { label: "Nationality", key: "nationality" }, // Main client
  { label: "School Name", key: "schoolName" }, // Main client (current school)
];

// Intake Form - General Information
const intakeGeneralInfoData = [
  { label: "Email Address", key: "emailAddress" },
  { label: "Place of Birth", key: "pob" }, // From client_details
  { label: "Sex", key: "sex" }, // From client_details
  { label: "Home Address", key: "homeAddress" }, // From client_details
  { label: "Religion", key: "religion" }, // From client_details
  { label: "Previous or On-going Activities", key: "previousOngoingActivities" }, // From client_details
  { label: "Kinderfield Center", key: "whichKinderfieldCenter" }, // From client_details
  { label: "Current School Enrolled", key: "currentSchoolEnrolled" }, // From client_details
];

// Intake Form - Child Abilities (Checkboxes)
const intakeAbilitiesData = [
  { label: "Gets along with others & controls emotions", key: "abilitiesSocial" },
  { label: "Forms caring, supportive relationships", key: "abilitiesRelationships" },
  { label: "Chooses healthy foods & participates in physical activity", key: "abilitiesHealth" },
  { label: "Can solve simple maths", key: "abilitiesMath" },
];

// Intake Form - Concerns & Expectations
const intakeConcernsExpectationsData = [
  { label: "Major Reasons/Concerns about child", key: "majorReasonsConcerns" },
  { label: "Previously met Psychologist/Psychiatrist?", key: "previouslyMetPsychologist", type: "boolean" },
  { label: "Details (if met psychologist)", key: "previousPsychologistDetails" },
  { label: "Expectations for current programs", key: "expectationsPrograms" },
  { label: "How heard about The Light Years", key: "howHeardAboutUs" },
  { label: "Child's Birth Order", key: "childBirthOrder" },
];

// Guardian Info (for display, will be mapped from an array)
const guardianDisplayFields = [
  { label: "Name", key: "guardianName" },
  { label: "Relationship to Child", key: "relationshipToChild" },
  { label: "Date of Birth", key: "dob", type: "date" },
  { label: "Sex", key: "sex" },
  { label: "Education", key: "education" },
  { label: "Job", key: "job" },
];

// Institution/Activity Info (for display, will be mapped from an array)
const institutionActivityDisplayFields = [
  { label: "Institution Name", key: "institutionName" },
  { label: "Age at Activity", key: "ageAtActivity" },
  { label: "Activity Description", key: "activityDescription" },
  { label: "Duration", key: "duration" },
];

const UserProfile = () => {
  const { user } = useSelector((state) => state.profile);

  // Assuming `user` now has a `clientDetails` property (nested object)
  // and `guardians` and `institutionsActivities` arrays if you adopted the separate tables
  const clientDetails = user?.clientDetails;
  const guardians = user?.guardians || [];
  const institutionsActivities = user?.institutionsActivities || [];

  const renderInfoRow = (label, value, suffix = "") => (
    <div className="row g-0 mb-4">
      <div className="col-sm-6 text-muted">{label}:</div>
      <div className="col-sm-6 fw-semibold">
        {value !== null && value !== undefined && value !== ""
          ? `${value}${suffix}`
          : "N/A"}
      </div>
    </div>
  );

  const renderBooleanRow = (label, value) => (
    <div className="row g-0 mb-4">
      <div className="col-sm-6 text-muted">{label}:</div>
      <div className="col-sm-6 fw-semibold">
        {value === true ? "Yes" : value === false ? "No" : "N/A"}
      </div>
    </div>
  );

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-body">
          {/* Main Client Info Section */}
          <div className="profile-details mb-5">
            <div className="mb-4 d-flex align-items-center justify-content-between">
              <h5 className="fw-bold mb-0">
                {user?.fullName} - {user?.age ?? 0} years old
              </h5>
            </div>
            {childInfoData.map((item, index) => {
              let value = user?.[item.key];
              if (item.type === "date" && value) {
                value = format(new Date(value), "dd MMM yyyy"); // Format date
              }
              return (
                <div
                  key={index}
                  className={`row g-0 ${
                    index === childInfoData.length - 1 ? "mb-0" : "mb-4"
                  }`}
                >
                  <div className="col-sm-6 text-muted">{item.label}:</div>
                  <div className="col-sm-6 fw-semibold">
                    {value !== null && value !== undefined && value !== ""
                      ? `${value}${item?.suffix || ""}`
                      : "N/A"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Intake Form: General Information */}
          {clientDetails && (
            <div className="profile-details mb-5">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0">Intake Form: General Information</h5>
              </div>
              {intakeGeneralInfoData.map((item, index) => {
                const value = clientDetails[item.key];
                return (
                  <div
                    key={index}
                    className={`row g-0 ${
                      index === intakeGeneralInfoData.length - 1
                        ? "mb-0"
                        : "mb-4"
                    }`}
                  >
                    <div className="col-sm-6 text-muted">{item.label}:</div>
                    <div className="col-sm-6 fw-semibold">
                      {value !== null && value !== undefined && value !== ""
                        ? value
                        : "N/A"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Intake Form: Guardians */}
          {guardians.length > 0 && (
            <div className="profile-details mb-5">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0">Intake Form: Guardians</h5>
              </div>
              {guardians.map((guardian, gIndex) => (
                <div key={`guardian-${gIndex}`} className="mb-4 pb-4 border-bottom">
                  <h6 className="fw-bold mb-3">Guardian {gIndex + 1}</h6>
                  {guardianDisplayFields.map((item, fIndex) => {
                    let value = guardian[item.key];
                    if (item.type === "date" && value) {
                      value = format(new Date(value), "dd MMM yyyy");
                    }
                    return (
                      <div key={fIndex} className="row g-0 mb-2">
                        <div className="col-sm-6 text-muted">{item.label}:</div>
                        <div className="col-sm-6 fw-semibold">
                          {value !== null && value !== undefined && value !== ""
                            ? value
                            : "N/A"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Intake Form: Institutions & Activities */}
          {institutionsActivities.length > 0 && (
            <div className="profile-details mb-5">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0">Intake Form: Institutions & Activities</h5>
              </div>
              {institutionsActivities.map((instAct, iaIndex) => (
                <div key={`instact-${iaIndex}`} className="mb-4 pb-4 border-bottom">
                  <h6 className="fw-bold mb-3">Record {iaIndex + 1}</h6>
                  {institutionActivityDisplayFields.map((item, fIndex) => (
                    <div key={fIndex} className="row g-0 mb-2">
                      <div className="col-sm-6 text-muted">{item.label}:</div>
                      <div className="col-sm-6 fw-semibold">
                        {instAct[item.key] !== null && instAct[item.key] !== undefined && instAct[item.key] !== ""
                          ? instAct[item.key]
                          : "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}


          {/* Intake Form: Child Abilities */}
          {clientDetails && (
            <div className="profile-details mb-5">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0">Intake Form: Child Abilities</h5>
              </div>
              {intakeAbilitiesData.map((item, index) =>
                renderBooleanRow(item.label, clientDetails[item.key])
              )}
            </div>
          )}

          {/* Intake Form: Concerns & Expectations */}
          {clientDetails && (
            <div className="profile-details mb-5">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0">Intake Form: Concerns & Expectations</h5>
              </div>
              {intakeConcernsExpectationsData.map((item, index) => {
                let value = clientDetails[item.key];
                if (item.type === "boolean") {
                  return renderBooleanRow(item.label, value);
                }
                return renderInfoRow(item.label, value);
              })}
            </div>
          )}

          {/* Existing Sharing Options (keep as is) */}
          <div className="mb-4 d-flex align-items-center justify-content-between">
            <h5 className="fw-bold mb-0">Sharing Options</h5>
          </div>

          <div className="mb-5">
            <label className="form-label">Company field is required? </label>
            {/* <SelectDropdown
                name="allowShareData"
                options={[{ label: '1', value: 1 }]}
                defaultSelect={"yes"}
                selectedOption={1}
                onSelectOption={(option) => console.log('test')}
            /> */}
            <small className="form-text text-muted">
              Company field is required? [Ex: Yes/No]
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;