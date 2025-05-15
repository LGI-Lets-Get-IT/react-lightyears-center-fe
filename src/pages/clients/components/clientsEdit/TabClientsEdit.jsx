import { useEffect, useState } from "react";
import { FiCalendar, FiCheck, FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import SelectDropdown from "@/components/shared/SelectDropdown";
import Input from "@/components/shared/Input";
import { genderOptions, relationshipOptions } from "@/utils/options";
import useLocationData from "@/hooks/useLocationData";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSchools } from "../../../../store/slice/schoolSlice";
import { updateClientByUuid } from "@/store/slice/clientSlice";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Field, Form, Formik } from "formik";

const TabProfile = ({ userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams();
  const { schools } = useSelector((state) => state.schools);
  const { countries } = useLocationData();
  const relationships = relationshipOptions;
  const gender = genderOptions;

  useEffect(() => {
    dispatch(fetchAllSchools());
  }, []);

  const handleSubmit = (values, actions) => {
    console.log('VALUES', uuid, values)

    dispatch(updateClientByUuid({ clientUuid: uuid, ...values }))
      .unwrap()
      .then(() => navigate(`/clients/${uuid}`))
      .catch((error) => console.error("handle error", error));
  };

  return (
    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
      <Formik initialValues={{
        fullName: userData?.fullName,
        dateOfBirth: userData?.dateOfBirth,
        gender: userData?.gender,
        nationality: userData?.nationality,
        schoolId: userData?.schoolId,
        guardianName: userData?.guardianName,
        guardianEmail: userData?.guardianEmail,
        guardianPhone: userData?.guardianPhone,
        guardianNationality: userData?.guardianNationality,
        guardianRelationship: userData?.guardianRelationship,
      }}
        enableReinitialize
        onSubmit={handleSubmit}>
        {({ values, setFieldValue, getFieldProps }) => (
          <Form>
            <div className="card-body personal-info">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0 me-4">
                  <span className="d-block mb-2">
                    {userData?.fullName}&apos;s Information Edit:
                  </span>
                  <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                    Edit Child Information.{" "}
                  </span>
                </h5>
              </div>
              <Field name="fullName">
                {({ field, meta }) => (
                  <Input
                    icon="feather-user"
                    label={"Full Name"}
                    labelId={"nameInput"}
                    placeholder={"Full Name"}
                    name={"fullName"}
                    value={values.fullName}
                    meta={meta}
                    {...field}
                    {...getFieldProps('fullName')}
                  />
                )}
              </Field>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label htmlFor="dateofBirth" className="fw-semibold">
                    Date of Birth:{" "}
                  </label>
                </div>
                <div className="col-lg-8">
                  <div className="input-group flex-nowrap">
                    <div className="input-group-text">
                      <FiCalendar size={16} />
                    </div>
                    <div
                      className="w-100 d-flex date rounded-0"
                      style={{ flexBasis: "95%" }}
                    >
                      <DatePicker
                        name="dateOfBirth"
                        showYearDropdown
                        placeholderText={`${userData?.dateOfBirth}`}
                        selected={values.dateOfBirth}
                        showPopperArrow={false}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => setFieldValue('dateOfBirth', date)}
                        className="form-control rounded-0"
                        popperPlacement="bottom-start"
                        calendarContainer={({ children }) => (
                          <div className="bg-white react-datepicker">
                            {children}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Gender: </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={'gender'}
                    options={gender}
                    selectedOption={values.gender}
                    placeholder={values.gender}
                    onSelectOption={(option) => {
                      setFieldValue('gender', option)
                    }}
                  />
                </div>
              </div>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Nationality: </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={'nationality'}
                    options={countries}
                    selectedOption={values.nationality}
                    placeholder={values.nationality}
                    onSelectOption={(option) => {
                      setFieldValue('nationality', option)
                    }}
                  />
                </div>
              </div>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">School Name: </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={'schoolId'}
                    options={schools.map((school) => ({
                      label: school.name,
                      value: school.id,
                    }))}
                    selectedOption={values.schoolId}
                    placeholder={userData?.schoolName}
                    onSelectOption={(option) => {
                      setFieldValue('schoolId', option)
                    }}
                  />
                  <hr className="my-0" />
                </div>
              </div>
            </div>
            <hr className="my-0" />
            <div className="card-body additional-info">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0 me-4">
                  <span className="d-block mb-2">
                    {userData?.fullName}&apos;s Guardian Information Edit:
                  </span>
                  <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                    Edit Guardian Information.
                  </span>
                </h5>
              </div>
              <Field name="guardianName">
                {({ field, meta }) => (
                  <Input
                    icon="feather-user"
                    label={"Guardian Name"}
                    labelId={"guardianNameInput"}
                    placeholder={"Guardian Name"}
                    name={"guardianName"}
                    value={values.guardianName}
                    meta={meta}
                    {...field}
                  />
                )}
              </Field>

              <Field name="guardianEmail">
                {({ field, meta }) => (
                  <Input
                    icon="feather-mail"
                    label={"Guardian Email"}
                    labelId={"emailInput"}
                    placeholder={"Guardian Email"}
                    name={"guardianEmail"}
                    type={"email"}
                    value={values.guardianEmail}
                    meta={meta}
                    {...field}
                  />
                )}
              </Field>

              <Field name="guardianPhone">
                {({ field, meta }) => (
                  <Input
                    icon="feather-phone"
                    label={"Guardian Phone"}
                    labelId={"phoneInput"}
                    placeholder={"Guardian Phone Number"}
                    name={"guardianPhone"}
                    value={values.guardianPhone}
                    meta={meta}
                    {...field}
                  />
                )}
              </Field>

              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Nationality: </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={'guardianNationality'}
                    options={countries}
                    selectedOption={values.guardianNationality}
                    placeholder={values.guardianNationality}
                    onSelectOption={(option) => {
                      setFieldValue('guardianNationality', option)
                    }}
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Relationship with child: </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={'guardianRelationship'}
                    options={relationships}
                    selectedOption={values.guardianRelationship}
                    placeholder={values.guardianRelationship}
                    onSelectOption={(option) => {
                      setFieldValue('guardianRelationship', option)
                    }}
                  />
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

                <button type="submit" className="btn btn-primary">
                  <FiCheck size={16} className="me-2" />
                  <span>Edit Client</span>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  );
};

export default TabProfile;
