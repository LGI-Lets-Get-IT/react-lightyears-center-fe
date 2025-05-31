import { useEffect, useState } from "react";
import { FiCalendar, FiCheck, FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import SelectDropdown from "@/components/shared/SelectDropdown";
import Input from "@/components/shared/Input";
import {
  countriesOptions,
  genderOptions,
  relationshipOptions,
} from "@/utils/options";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSchools } from "../../../store/slice/schoolSlice";
import { createClient } from "@/store/slice/clientSlice";
import { useNavigate } from "react-router-dom";
import { Field, FieldArray, Form, Formik } from "formik";
import { clientSchema } from "@/schemas/clientSchema";
import TextArea from "@/components/shared/TextArea";

const TabProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: createLoading } = useSelector((state) => state.clients);
  const { schools } = useSelector((state) => state.schools);
  const countries = countriesOptions;
  const relationships = relationshipOptions;
  const genders = genderOptions;

  useEffect(() => {
    dispatch(fetchAllSchools());
  }, []);

  const handleSubmit = (values, actions) => {
    console.log("VALIESSS", values);
    dispatch(createClient(values))
      .unwrap()
      .then(() => {
        actions.resetForm(),
        navigate('/clients')
      })
      .catch((error) => console.error("handle error", error));
  };

  return (
    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
      <Formik
        initialValues={{
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
          intakeForm: {
            placeOfBirth: null,
            religion: null,
            homeAddress: null,
            previousOngoingActivity: null,
            majorReasonConcerns: null,
            previousPsychologicalDetails: null,
            socialAbilities: null,
            relationshipAbilities: null,
            healthAbilities: null,
            mathAbilities: null,
            programsExpectations: null,
            howHeardAboutUs: null,
            childBirthOrder: null,
            institutions: [],
            guardians: [],
          },
        }}
        validationSchema={clientSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
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
                      className={`${meta.error ? "is-invalid" : ""}`}
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
                    {({ meta }) => (
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
                                setFieldValue("dateOfBirth", date);
                              }}
                              className={`form-control rounded-0 ${
                                meta.error ? "is-invalid" : ""
                              }`}
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
                      setFieldValue("gender", option.value);
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
                      setFieldValue("nationality", option.label);
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
                      setFieldValue("schoolId", option.value);
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
              <div className="row mb-4 align-items-center">
                <div className="col-lg-12">
                  <Field name="problem">
                    {({ field, meta }) => (
                      <TextArea
                        name={"problem"}
                        label={"Problem"}
                        placeholder={"Please specify the problem here"}
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
                      className={`${meta.error ? "is-invalid" : ""}`}
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
                      className={`${meta.error ? "is-invalid" : ""}`}
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
                      className={`${meta.error ? "is-invalid" : ""}`}
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
                      setFieldValue("guardianNationality", option.value);
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
                      setFieldValue("guardianRelationship", option.value)
                    }
                  />
                </div>
              </div>

              {/* <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
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
              </div> */}
            </div>
            <hr className="my-0" />
            <div className="card-body additional-info">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0 me-4">
                  <span className="d-block mb-2">
                    Client Intake Form Information:
                  </span>
                  <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                    Communication details for us to connect with.
                  </span>
                </h5>
              </div>
              <Field name="intakeForm.placeOfBirth">
                {({ field, meta }) => (
                  <>
                    <Input
                      name={"placeOfBirth"}
                      icon="feather-map-pin"
                      label={"Place of Birth"}
                      labelId={"placeOfBirthInput"}
                      placeholder={"Place of Birth"}
                      value={values.intakeForm.placeOfBirth}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.religion">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={"Religion"}
                      labelId={"religionInput"}
                      placeholder={"Religion"}
                      name={"religion"}
                      type={"text"}
                      value={values.intakeForm.religion}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.homeAddress">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={"Home Address"}
                      labelId={"homeAddressInput"}
                      placeholder={"Home Address"}
                      name={"homeAddress"}
                      value={values.intakeForm.homeAddress}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.previousOngoingActivity">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={"Previous Ongoing Activity"}
                      labelId={"previousOngoingActivityInput"}
                      placeholder={"Previous Ongoing Activity"}
                      name={"previousOngoingActivity"}
                      value={values.intakeForm.previousOngoingActivity}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.majorReasonConcerns">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={
                        "What are your major reasons or concerns about your child"
                      }
                      labelId={"majorReasonConcernsInput"}
                      placeholder={"Major Reason Concerns"}
                      name={"majorReasonConcerns"}
                      value={values.intakeForm.majorReasonConcerns}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.previousPsychologicalDetails">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={
                        "Have you previously met a psychologist/psychiatrist before? If yes, please explain"
                      }
                      labelId={"previousPsychologicalDetailsInput"}
                      placeholder={"Previous Psychological Details"}
                      name={"previousPsychologicalDetails"}
                      value={values.intakeForm.previousPsychologicalDetails}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.socialAbilities">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={
                        "Ability to get along with others and control emotions?"
                      }
                      labelId={"socialAbilitiesInput"}
                      placeholder={
                        "Ability to get along with others and control emotions?"
                      }
                      name={"socialAbilities"}
                      value={values.intakeForm.socialAbilities}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.relationshipAbilities">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={
                        "Forms caring, supportive relationships with family members, other adults, and peers?"
                      }
                      labelId={"relationshipAbilitiesInput"}
                      placeholder={
                        "Forms caring, supportive relationships with family members, other adults, and peers?"
                      }
                      name={"relationshipAbilities"}
                      value={values.intakeForm.relationshipAbilities}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.healthAbilities">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={
                        "Chooses to eat healthy foods, and participate in physical activity everyday?"
                      }
                      labelId={"healthAbilitiesInput"}
                      placeholder={
                        "Chooses to eat healthy foods, and participate in physical activity everyday?"
                      }
                      name={"healthAbilities"}
                      value={values.intakeForm.healthAbilities}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.mathAbilities">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={"Can solve simple maths?"}
                      labelId={"mathAbilitiesInput"}
                      placeholder={"Can solve simple maths?"}
                      name={"mathAbilities"}
                      value={values.intakeForm.mathAbilities}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.programsExpectations">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={
                        "What is your expectation(s) for the current developmental programs?"
                      }
                      labelId={"programsExpectationsInput"}
                      placeholder={
                        "What is your expectation(s) for the current developmental programs?"
                      }
                      name={"programsExpectations"}
                      value={values.intakeForm.programsExpectations}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.howHeardAboutUs">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={
                        "Where did you hear about The Light Years Child Development Center?"
                      }
                      labelId={"howHeardAboutUsInput"}
                      placeholder={
                        "Where did you hear about The Light Years Child Development Center?"
                      }
                      name={"howHeardAboutUs"}
                      value={values.intakeForm.howHeardAboutUs}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <Field name="intakeForm.childBirthOrder">
                {({ field, meta }) => (
                  <>
                    <Input
                      label={
                        "What is your child's birth order compared to their siblings?"
                      }
                      labelId={"childBirthOrderInput"}
                      placeholder={
                        "What is your child's birth order compared to their siblings?"
                      }
                      name={"childBirthOrder"}
                      value={values.intakeForm.childBirthOrder}
                      className={`${meta.error ? "is-invalid" : ""}`}
                      meta={meta}
                      {...field}
                    />
                  </>
                )}
              </Field>

              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">
                    Additional Institutions:{" "}
                  </label>
                </div>
                <div className="col-lg-8">
                  <FieldArray
                    name="intakeForm.institutions"
                    render={(arrayHelpers) => (
                      <div className="col-lg-12">
                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <button
                            className="btn btn-sm bg-soft-danger text-danger"
                            onClick={() => {
                              arrayHelpers.pop();
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              arrayHelpers.push({
                                institutionName: null,
                                age: null,
                                activity: null,
                                duration: null,
                              })
                            }
                          >
                            Add Institution
                          </button>
                        </div>
                        <div className="accordion proposal-faq-accordion">
                          {values.intakeForm.institutions &&
                            values.intakeForm.institutions.map(
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
                                    <div className="col-sm-9">
                                      <Field
                                        name={`intakeForm.institutions[${index}].institutionName`}
                                      >
                                        {({ field, meta }) => (
                                          <>
                                            <input
                                              type="text"
                                              className={`form-control ${
                                                meta.error ? "is-invalid" : ""
                                              }`}
                                              placeholder="Please specify the institution name"
                                              {...field}
                                            />
                                            {meta.error && (
                                              <div className="text-danger">
                                                {meta.error}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>

                                  <div className="form-group row mb-3 align-items-center">
                                    <label className="col-sm-3 col-form-label">
                                      Age <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        name={`intakeForm.institutions[${index}].age`}
                                      >
                                        {({ field, meta }) => (
                                          <>
                                            <input
                                              type="number"
                                              className={`form-control ${
                                                meta.error ? "is-invalid" : ""
                                              }`}
                                              placeholder="Please specify the age"
                                              min={1}
                                              {...field}
                                            />
                                            {meta.error && (
                                              <div className="text-danger">
                                                {meta.error}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>

                                  <div className="form-group row mb-3 align-items-center">
                                    <label className="col-sm-3 col-form-label">
                                      Activity{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        name={`intakeForm.institutions[${index}].activity`}
                                      >
                                        {({ field, meta }) => (
                                          <>
                                            <input
                                              type="text"
                                              className={`form-control ${
                                                meta.error ? "is-invalid" : ""
                                              }`}
                                              placeholder="Please specify the activity"
                                              {...field}
                                            />
                                            {meta.error && (
                                              <div className="text-danger">
                                                {meta.error}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>
                                  <div className="form-group row mb-3 align-items-center">
                                    <label className="col-sm-3 col-form-label">
                                      Duration{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        name={`intakeForm.institutions[${index}].duration`}
                                      >
                                        {({ field, meta }) => (
                                          <>
                                            <input
                                              type="text"
                                              className={`form-control ${
                                                meta.error ? "is-invalid" : ""
                                              }`}
                                              placeholder="Please specify the duration"
                                              {...field}
                                            />
                                            {meta.error && (
                                              <div className="text-danger">
                                                {meta.error}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>
                                </AccordionItem>
                              )
                            )}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Guardians: </label>
                </div>
                <div className="col-lg-8">
                  <FieldArray
                    name="intakeForm.guardians"
                    render={(arrayHelpers) => (
                      <div className="col-lg-12">
                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <button
                            className="btn btn-sm bg-soft-danger text-danger"
                            onClick={() => {
                              arrayHelpers.pop();
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              arrayHelpers.push({
                                guardianName: null,
                                relationship: null,
                                placeOfBirth: null,
                                dateOfBirth: null,
                                gender: null,
                                education: null,
                                job: null,
                              })
                            }
                          >
                            Add Guardian
                          </button>
                        </div>
                        <div className="accordion proposal-faq-accordion">
                          {values.intakeForm.guardians &&
                            values.intakeForm.guardians.map(
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
                                    <div className="col-sm-9">
                                      <Field
                                        name={`intakeForm.guardians[${index}].guardianName`}
                                      >
                                        {({ field, meta }) => (
                                          <>
                                            <input
                                              type="text"
                                              className={`form-control ${
                                                meta.error ? "is-invalid" : ""
                                              }`}
                                              placeholder="Please specify the guardian name"
                                              {...field}
                                            />
                                            {meta.error && (
                                              <div className="text-danger">
                                                {meta.error}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>

                                  <div className="form-group row mb-3 align-items-center">
                                    <label className="col-sm-3 col-form-label">
                                      Relationship to Child{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-9">
                                      <SelectDropdown
                                        name={`intakeForm.guardians[${index}].relationship`}
                                        options={relationships}
                                        selectedOption={
                                          values.intakeForm.guardians[index]
                                            .relationship
                                        }
                                        placeholder="Select Relationship"
                                        onSelectOption={(option) =>
                                          setFieldValue(
                                            `intakeForm.guardians[${index}].relationship`,
                                            option.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group row mb-3 align-items-center">
                                    <label className="col-sm-3 col-form-label">
                                      Place of Birth{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        name={`intakeForm.guardians[${index}].placeOfBirth`}
                                      >
                                        {({ field, meta }) => (
                                          <>
                                            <input
                                              type="text"
                                              className={`form-control ${
                                                meta.error ? "is-invalid" : ""
                                              }`}
                                              placeholder="Please specify the guardian place of birth"
                                              {...field}
                                            />
                                            {meta.error && (
                                              <div className="text-danger">
                                                {meta.error}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>

                                  <div className="form-group row mb-3 align-items-center">
                                    <label className="col-sm-3 col-form-label">
                                      Date of Birth{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        name={`intakeForm.guardians[${index}].dateOfBirth`}
                                      >
                                        {({ meta }) => (
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
                                                  selected={
                                                    values.intakeForm.guardians[
                                                      index
                                                    ].dateOfBirth
                                                  }
                                                  showPopperArrow={false}
                                                  dateFormat="yyyy-MM-dd"
                                                  onChange={(date) => {
                                                    setFieldValue(
                                                      `intakeForm.guardians[${index}].dateOfBirth`,
                                                      date
                                                    );
                                                  }}
                                                  className={`form-control rounded-0 ${
                                                    meta.error
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  popperPlacement="bottom-start"
                                                  calendarContainer={({
                                                    children,
                                                  }) => (
                                                    <div className="bg-white react-datepicker">
                                                      {children}
                                                      {/* {renderFooter("start")} */}
                                                    </div>
                                                  )}
                                                />
                                              </div>
                                            </div>
                                            {meta.error && (
                                              <div className="mt-1 text-danger">
                                                {meta.error}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>

                                  <div className="form-group row mb-3 align-items-center">
                                    <label className="col-sm-3 col-form-label">
                                      Gender{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-9">
                                      <SelectDropdown
                                        name={`intakeForm.guardians[${index}].gender`}
                                        options={genders}
                                        selectedOption={
                                          values.intakeForm.guardians[index]
                                            .gender
                                        }
                                        placeholder={"Select Guardian Gender"}
                                        onSelectOption={(option) => {
                                          setFieldValue(
                                            `intakeForm.guardians[${index}].gender`,
                                            option.value
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group row mb-3 align-items-center">
                                    <label className="col-sm-3 col-form-label">
                                      Education{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        name={`intakeForm.guardians[${index}].education`}
                                      >
                                        {({ field, meta }) => (
                                          <>
                                            <input
                                              type="text"
                                              className={`form-control ${
                                                meta.error ? "is-invalid" : ""
                                              }`}
                                              placeholder="Please specify the guardian's education"
                                              {...field}
                                            />
                                            {meta.error && (
                                              <div className="text-danger">
                                                {meta.error}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>

                                  <div className="form-group row mb-3 align-items-center">
                                    <label className="col-sm-3 col-form-label">
                                      Job <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-sm-9">
                                      <Field
                                        name={`intakeForm.guardians[${index}].job`}
                                      >
                                        {({ field, meta }) => (
                                          <>
                                            <input
                                              type="text"
                                              className={`form-control ${
                                                meta.error ? "is-invalid" : ""
                                              }`}
                                              placeholder="Please specify the guardian's job"
                                              {...field}
                                            />
                                            {meta.error && (
                                              <div className="text-danger">
                                                {meta.error}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>
                                </AccordionItem>
                              )
                            )}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
                <a className="btn btn-light-brand" onClick={() => navigate(-1)}>
                  <FiX size={16} className="me-2" />
                  <span>Cancel</span>
                </a>
                <button type="submit" className="btn btn-primary" disabled={createLoading}>
                  {createLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-white me-2"
                      role="status"
                    />
                  ) : (
                    <FiCheck size={16} className="me-2" />
                  )}
                  <span>Create Client</span>
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
