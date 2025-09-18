import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns"; // For formatting dates
import {
  genderOptions,
  relationshipOptions,
  sharingOptions,
} from "@/utils/options";
import { Field, Form, Formik } from "formik";
import SelectDropdown from "@/components/shared/SelectDropdown";
import useLocationData from "@/hooks/useLocationData";
import { FiCheck, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "@/store/slice/profileSlice";

// Intake Form - General Information
const intakeGeneralInfoData = [
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

// Intake Form - Child Abilities (Checkboxes)
const intakeAbilitiesData = [
  {
    label: "Gets along with others & controls emotions",
    key: "socialAbilities",
  },
  {
    label: "Forms caring, supportive relationships",
    key: "relationshipAbilities",
  },
  {
    label: "Chooses healthy foods & participates in physical activity",
    key: "healthAbilities",
  },
  { label: "Can solve simple maths", key: "mathAbilities" },
];

// Intake Form - Concerns & Expectations
const intakeConcernsExpectationsData = [
  { label: "Major Reasons/Concerns about child", key: "majorReasonConcerns" },
  {
    label: "Previous Met Psychologist/Psychiatrist Details (if any)",
    key: "previousPsychologicalDetails",
  },
  { label: "Expectations for current programs", key: "programsExpectations" },
  {
    label: "Where did you hear about The Light Years Child Development Center",
    key: "howHeardAboutUs",
  },
  { label: "Child's Birth Order", key: "childBirthOrder" },
];

// Guardian Info (for display, will be mapped from an array)
const guardianDisplayFields = [
  { label: "Name", key: "guardianName" },
  { label: "Relationship to Child", key: "relationship" },
  { label: "Date of Birth", key: "dateOfBirth", type: "date" },
  { label: "Gender", key: "gender" },
  { label: "Education", key: "education" },
  { label: "Job", key: "job" },
];

// Institution/Activity Info (for display, will be mapped from an array)
const institutionActivityDisplayFields = [
  { label: "Institution Name", key: "institutionName" },
  { label: "Age at Activity", key: "age" },
  { label: "Activity Description", key: "activity" },
  { label: "Duration", key: "duration" },
];

const UserProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading: updateLoading } = useSelector(
    (state) => state.profile
  );
  const { countries } = useLocationData();

  // Assuming `user` now has a `clientDetails` property (nested object)
  // and `guardians` and `institutionsActivities` arrays if you adopted the separate tables
  //   const clientDetails = user?.clientDetails;
  //   const guardians = clientDetails?.guardiansData || [];
  //   const institutionsActivities = clientDetails?.institutionsData || [];
  const childInfoData = [
    { label: "Full Name", key: "fullName" },
    {
      label: "Gender",
      key: "gender",
      type: "dropdown",
      options: genderOptions,
    },
    { label: "Age", key: "age", suffix: " old", disabled: true },
    { label: "Date of Birth", key: "dateOfBirth", type: "date" },
    {
      label: "Nationality",
      key: "nationality",
      type: "dropdown",
      options: countries,
    },
    { label: "School Name", key: "schoolName", disabled: true },
    { label: "Class Name", key: "className" },
  ];

  const guardianInfoData = [
    { label: "Guardian Name", key: "guardianName" },
    {
      label: "Relationship With Child",
      key: "guardianRelationship",
      type: "dropdown",
      options: relationshipOptions,
    },
    {
      label: "Guardian Nationality",
      key: "guardianNationality",
      type: "dropdown",
      options: countries,
    },
    { label: "Guardian Email", key: "guardianEmail" },
    { label: "Guardian Phone", key: "guardianPhone" },
  ];

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

  const handleSubmit = (values) => {
    console.log("VALL", values);
    dispatch(updateUserProfile(values))
      .unwrap()
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => console.error("Error: ", err));
  };

  return (
    <div className="main-content">
      <div className="card">
        <Formik
          initialValues={{
            fullName: user?.fullName,
            gender: user?.gender,
            age: user?.age,
            dateOfBirth: user?.dateOfBirth
              ? format(new Date(user.dateOfBirth), "yyyy-MM-dd")
              : "",
            nationality: user?.nationality,
            schoolName: user?.schoolName,
            className: user?.className,
            guardianName: user?.guardianName,
            guardianRelationship: user?.guardianRelationship,
            guardianNationality: user?.guardianNationality,
            guardianEmail: user?.guardianEmail,
            guardianPhone: user?.guardianPhone,
            allowShareData: user?.allowShareData,
          }}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="card-body">
                {/* Main Client Info Section */}
                <div className="profile-details mb-5">
                  <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">
                      <span className="d-block mb-2">Edit Profile</span>
                      <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                        Last Edited:{" "}
                        {user?.updatedAt &&
                          format(user.updatedAt, "dd MMM yyyy, HH:mm aa")}
                      </span>
                    </h5>
                  </div>
                  {childInfoData.map((item, index) => {
                    const isDropdown = item.type === "dropdown";
                    return (
                      <div
                        key={index}
                        className={`row g-0 ${
                          index === childInfoData.length - 1 ? "mb-0" : "mb-4"
                        }`}
                      >
                        <div className="col-sm-6 text-muted">{item.label}:</div>
                        <div className="col-sm-6">
                          {isDropdown ? (
                            <SelectDropdown
                              name={item.key}
                              options={item.options}
                              selectedOption={values[item.key]}
                              placeholder={`Select ${item.label}`}
                              onSelectOption={(option) => {
                                setFieldValue(item.key, option.value);
                              }}
                            />
                          ) : (
                            <Field name={item.key}>
                              {({ field, meta }) => (
                                <input
                                  type={item.type === "date" ? "date" : "text"}
                                  className={`form-control ${
                                    meta.touched && meta.error
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={item.disabled}
                                  {...field}
                                />
                              )}
                            </Field>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="profile-details mb-5">
                  <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">
                      <span className="d-block mb-2">Guardian Information</span>
                    </h5>
                  </div>
                  {guardianInfoData.map((item, index) => {
                    const isDropdown = item.type === "dropdown";
                    return (
                      <div
                        key={index}
                        className={`row g-0 ${
                          index === guardianInfoData.length - 1
                            ? "mb-0"
                            : "mb-4"
                        }`}
                      >
                        <div className="col-sm-6 text-muted">{item.label}:</div>
                        <div className="col-sm-6">
                          {isDropdown ? (
                            <SelectDropdown
                              name={item.key}
                              options={item.options}
                              selectedOption={values[item.key]}
                              placeholder={`Select ${item.label}`}
                              onSelectOption={(option) => {
                                setFieldValue(item.key, option.value);
                              }}
                            />
                          ) : (
                            <Field name={item.key}>
                              {({ field, meta }) => (
                                <input
                                  type={item.type === "date" ? "date" : "text"}
                                  className={`form-control ${
                                    meta.touched && meta.error
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  disabled={item.disabled}
                                  {...field}
                                />
                              )}
                            </Field>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Existing Sharing Options (keep as is) */}
                <div className="sharing-details">
                  <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0">Sharing Options</h5>
                  </div>
                  <div className="row g-0 mb-4">
                    <div className="col-sm-6 text-muted">
                      Allow sharing data to school?:
                    </div>
                    <div className="col-sm-6 fw-semibold">
                      <Field name="allowShareData">
                        {({ meta }) => (
                          <select
                            className={`form-control ${
                              meta.errors ? "is-invalid" : ""
                            }`}
                            value={values.allowShareData}
                            onChange={(event) => {
                              setFieldValue(
                                "allowShareData",
                                event.target.value
                              );
                            }}
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
                    <a
                      className="btn btn-light-brand"
                      onClick={() => navigate(-1)}
                    >
                      <FiX size={16} className="me-2" />
                      <span>Cancel</span>
                    </a>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <div
                          className="spinner-border spinner-border-sm text-white me-2"
                          role="status"
                        />
                      ) : (
                        <FiCheck size={16} className="me-2" />
                      )}
                      <span>Edit Profile</span>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserProfileEdit;
