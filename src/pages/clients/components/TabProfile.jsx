import { useEffect, useState } from "react";
import { FiCalendar, FiCheck, FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import SelectDropdown from "@/components/shared/SelectDropdown";
import Input from "@/components/shared/Input";
import { countriesOptions, genderOptions, relationshipOptions } from "@/utils/options";
import useLocationData from "@/hooks/useLocationData";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSchools } from "../../../store/slice/schoolSlice";
import { createClient } from "@/store/slice/clientSlice";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { clientSchema } from "@/schemas/clientSchema";
import TextArea from "@/components/shared/TextArea";

const TabProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: createLoading } = useSelector(state => state.clients)
  const { schools } = useSelector((state) => state.schools);
  const countries = countriesOptions;
  const relationships = relationshipOptions;
  const genders = genderOptions;

  useEffect(() => {
    dispatch(fetchAllSchools());
  }, []);

  const handleSubmit = (values, actions) => {
    console.log('VALIESSS', values)
    dispatch(createClient(values))
      .unwrap()
      .then(() => navigate("/clients"))
      .catch((error) => console.error("handle error", error));
  };

  return (
    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
      <Formik initialValues={{
        fullName: null,
        dateOfBirth: null,
        gender: null,
        nationality: null,
        problem: null,
        className: null,
        schoolId: null,
        guardianName: null,
        guardianEmail: null,
        guardianPhone: null,
        guardianNationality: null,
        guardianRelationship: null,
      }}
        validationSchema={clientSchema}
        onSubmit={handleSubmit}>
        {({ values, setFieldValue, getFieldProps }) => (
          <Form>
            <div className="card-body personal-info">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0 me-4">
                  <span className="d-block mb-2">Child Information:</span>
                  <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                    Following information is publicly displayed, be careful!{" "}
                  </span>
                </h5>
              </div>
              <Field name="fullName">
                {({ field, meta }) => (
                  <>
                    <Input
                      icon="feather-user"
                      label={"Full Name"}
                      labelId={"nameInput"}
                      placeholder={"Full Name"}
                      name={"fullName"}
                      value={values.fullName}
                      className={`${meta.error ? 'is-invalid' : ''}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label htmlFor="dateofBirth" className="fw-semibold">
                    Date of Birth:{" "}
                  </label>
                </div>

                <div className="col-lg-8">
                  <Field name="dateOfBirth">
                    {({ meta, field }) => (
                      <>
                        <div className="input-group flex-nowrap">
                          <div className="input-group-text">
                            <FiCalendar size={16} />
                          </div>
                          <div
                            className="w-100 d-flex date  rounded-0"
                            style={{ flexBasis: "95%" }}
                          >
                            <DatePicker
                              showYearDropdown
                              placeholderText="Pick date of birth"
                              selected={values.dateOfBirth}
                              showPopperArrow={false}
                              dateFormat="yyyy-MM-dd"
                              onChange={(date) => {
                                setFieldValue('dateOfBirth', date)
                              }}
                              className={`form-control rounded-0 ${meta.error ? 'is-invalid' : ''}`}
                              popperPlacement="bottom-start"
                              calendarContainer={({ children }) => (
                                <div className="bg-white react-datepicker">
                                  {children}
                                  {/* {renderFooter("start")} */}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        {meta.error && (
                          <div className="mt-1 text-danger">{meta.error}</div>
                        )}
                      </>
                    )}
                  </Field>
                </div>
              </div>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Gender: </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={"gender"}
                    options={genders}
                    selectedOption={values.gender}
                    placeholder={"Select Child Gender"}
                    onSelectOption={(option) => {
                      setFieldValue('gender', option.value)
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
                    name="nationality"
                    options={countries}
                    selectedOption={values.nationality}
                    placeholder={"Select Child Nationality"}
                    onSelectOption={(option) => {
                      setFieldValue('nationality', option.label)
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
                    name={"schoolId"}
                    options={schools.map((school) => ({
                      label: school.name,
                      value: school.id,
                    }))}
                    selectedOption={values.schoolId}
                    placeholder={"Select School Name"}
                    onSelectOption={(option) => {
                      setFieldValue('schoolId', option.value)
                    }}
                  />
                  <hr className="my-0" />
                </div>
              </div>
              <Field name="className">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={"Class Name"}
                      labelId={"classNameInput"}
                      placeholder={"Class Name"}
                      name={"className"}
                      value={values.className}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>
              <hr className="my-0" />
              <div className="row mb-4 align-items-center">
                <div className="col-lg-12">
                  <Field name="problem">
                    {({ field, meta }) => (
                      <TextArea
                        name={'problem'}
                        label={'Problem'}
                        placeholder={'Please specify the problem here'}
                        row="4"
                        meta={meta}
                        {...field}
                      />
                      // <>
                      //   <textarea
                      //     id="problem"
                      //     rows={6}
                      //     className={`form-control ${meta.error ? "is-invalid" : ""
                      //       }`}
                      //     placeholder="Please specify the problem here"
                      //     defaultValue={""}
                      //     {...field}
                      //   />
                      //   {meta.error && (
                      //     <div className="mt-1 text-danger">{meta.error}</div>
                      //   )}
                      // </>
                    )}
                  </Field>
                </div>
              </div>
            </div>
            <hr className="my-0" />
            <div className="card-body additional-info">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0 me-4">
                  <span className="d-block mb-2">Guardian Information:</span>
                  <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                    Communication details for us to connect with.
                  </span>
                </h5>
              </div>
              <Field name="guardianName">
                {({ field, meta }) => (
                  <>
                    <Input
                      name={"guardianName"}
                      icon="feather-user"
                      label={"Guardian Name"}
                      labelId={"guardianNameInput"}
                      placeholder={"Guardian Name"}
                      value={values.guardianName}
                      className={`${meta.error ? 'is-invalid' : ''}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="guardianEmail">
                {({ field, meta }) => (
                  <>
                    <Input
                      icon="feather-mail"
                      label={"Guardian Email"}
                      labelId={"emailInput"}
                      placeholder={"Guardian Email"}
                      name={"guardianEmail"}
                      type={"email"}
                      value={values.guardianEmail}
                      className={`${meta.error ? 'is-invalid' : ''}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="guardianPhone">
                {({ field, meta }) => (
                  <>
                    <Input
                      icon="feather-phone"
                      label={"Guardian Phone"}
                      labelId={"phoneInput"}
                      placeholder={"Guardian Phone Number"}
                      name={"guardianPhone"}
                      value={values.guardianPhone}
                      className={`${meta.error ? 'is-invalid' : ''}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Nationality: </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name="guardianNationality"
                    options={countries}
                    selectedOption={values.guardianNationality}
                    placeholder={"Select Guardian Nationality"}
                    onSelectOption={(option) => {
                      setFieldValue('guardianNationality', option.value)
                    }}
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Relationship to child: </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name="guardianRelationship"
                    options={relationships}
                    selectedOption={values.guardianRelationship}
                    placeholder="Select Relationship"
                    onSelectOption={(option) =>
                      setFieldValue('guardianRelationship', option.value)
                    }
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
                <a className="btn btn-light-brand" onClick={() => navigate(-1)}>
                  <FiX size={16} className="me-2" />
                  <span>Cancel</span>
                </a>
                <button type="submit" className="btn btn-primary">
                  {createLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-white me-2"
                      role="status"
                    />
                  ) : <FiCheck size={16} className="me-2" />
                  }
                  <span>Create Client</span>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
};

export default TabProfile;
