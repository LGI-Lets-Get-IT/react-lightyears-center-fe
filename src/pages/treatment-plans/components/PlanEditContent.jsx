import React, { useEffect, useState } from "react";
import SelectDropdown from "@/components/shared/SelectDropdown";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPsychologists,
  fetchAllTherapists,
} from "@/store/slice/employeeSlice";
import { fetchAllClients } from "@/store/slice/clientSlice";
import { FiCheck, FiX } from "react-icons/fi";
import { Field, FieldArray, Form, Formik } from "formik";
import { treatmentPlanSchema } from "@/schemas/treatmentPlanSchema";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllTreatmentTypes } from "@/store/slice/treatmentTypeSlice";
import { format } from "date-fns";
import { updatePlanById } from "@/store/slice/treatmentPlanSlice";

const PlanEditContent = ({ planData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams()
  const { clients } = useSelector((state) => state.clients);
  const { currentUser } = useSelector((state) => state.auth);
  const { psychologists, therapists } = useSelector((state) => state.employees);
  const { treatmentTypes } = useSelector((state) => state.treatmentTypes);

  const onSubmit = async (values) => {
    dispatch(updatePlanById({
      planId: id,
      data: values
    }))
      .unwrap()
      .then(() => navigate(`/treatment-plans/${id}`))
      .catch((err) => console.log('Error', err));
  };

  useEffect(() => {
    dispatch(fetchAllPsychologists());
    dispatch(fetchAllTherapists());
    dispatch(fetchAllClients());
    dispatch(fetchAllTreatmentTypes());
  }, []);
  return (
    <>
      <div className="col-lg-12">
        <div className="card stretch stretch-full">
          <div className="card-body">
            <div className="mb-5 d-flex align-items-center justify-content-between">
              <h5 className="fw-bold mb-0 me-4">
                <span className="d-block mb-2">Edit Treatment Plan</span>
                <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                  Last Edited: {planData && format(planData?.updatedAt, 'dd MMM yyyy, HH:mm aa')}
                </span>
              </h5>
            </div>
            <Formik
              initialValues={{
                clientId: planData?.clientId,
                psychologistId: planData?.psychologistId,
                consultDate: planData?.consultDate,
                presentProblem: planData?.presentProblem,
                parentPlan: planData?.parentPlan,
                programs: planData?.programs,
                targets: planData?.targets,
              }}
              validationSchema={treatmentPlanSchema}
              enableReinitialize
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="row">
                    <div className="col-lg-4 mb-4">
                      <label className="form-label">
                        Client Name <span className="text-danger">*</span>
                      </label>
                      <SelectDropdown
                        isDisabled={true}
                        name="clientId"
                        options={clients.map((item) => ({
                          label: item.fullName,
                          value: item.id,
                        }))}
                        selectedOption={values.clientId}
                        placeholder={"Select Client"}
                        onSelectOption={(option) => {
                          setFieldValue('clientId', option.value)
                        }}
                      />
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="form-label">
                        Psychologist Name <span className="text-danger">*</span>
                      </label>
                      <SelectDropdown
                        name="psychologistId"
                        options={psychologists.map((item) => ({
                          label: item.fullName,
                          value: item.id,
                        }))}
                        isDisabled={currentUser.role === "Psychologist"}
                        defaultSelect={
                          currentUser.role === "Psychologist"
                            ? currentUser.id
                            : null
                        }
                        selectedOption={values.psychologistId}
                        placeholder={"Select Psychologist In Charge"}
                        onSelectOption={(option) => {
                          setFieldValue('psychologistId', option.value)
                        }}
                      />
                    </div>
                    <div className="col-lg-4 mb-4">
                      <label className="form-label">
                        Consultation Date <span className="text-danger">*</span>
                      </label>
                      <div className="input-group date flex-column">
                        <Field name="consultDate">
                          {({ meta }) => (
                            <>
                              <DatePicker
                                name="consultDate"
                                placeholderText="YYYY-MM-DD"
                                dateFormat={"yyyy-MM-dd"}
                                showPopperArrow={false}
                                selected={values.consultDate}
                                onChange={(date) => {
                                  setFieldValue(
                                    "consultDate",
                                    date
                                    // format(date, "yyyy-MM-dd")
                                  );
                                }}
                                className={`form-control ${meta.error ? "is-invalid" : ""
                                  }`}
                                popperPlacement="bottom-start"
                                calendarContainer={({ children }) => (
                                  <div className="bg-white react-datepicker">
                                    {children}
                                  </div>
                                )}
                              />
                              {meta.error && (
                                <div className="mt-1 text-danger">{meta.error}</div>
                              )}
                            </>
                          )}
                        </Field>
                      </div>
                    </div>
                    <div className="col-lg-12 mb-4">
                      <label htmlFor="presentProblem" className="form-label">
                        Present Problem <span className="text-danger">*</span>
                      </label>
                      <Field name="presentProblem">
                        {({ field, meta }) => (
                          <>
                            <textarea
                              id="presentProblem"
                              rows={6}
                              className={`form-control ${meta.error ? "is-invalid" : ""
                                }`}
                              placeholder="Please specify the problem here"
                              defaultValue={""}
                              {...field}
                            />
                            {meta.error && (
                              <div className="mt-1 text-danger">{meta.error}</div>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="col-lg-12 mb-4">
                      <label htmlFor="parentPlan" className="form-label">
                        Parent Collaboration Plan{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Field name="parentPlan">
                        {({ field, meta }) => (
                          <>
                            <textarea
                              id="parentPlan"
                              rows={6}
                              className={`form-control ${meta.error ? "is-invalid" : ""
                                }`}
                              placeholder="Please specify the plan here"
                              defaultValue={""}
                              {...field}
                            />
                            {meta.error && (
                              <div className="mt-1 text-danger">{meta.error}</div>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                  </div>
                  <hr className="border-dashed" />
                  <FieldArray
                    name="programs"
                    render={(arrayHelpers) => (
                      <div className="col-lg-12">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                          <h5 className="fw-bold mb-0 me-4">
                            <span className="d-block mb-2">
                              Treatment Programs:
                            </span>
                            <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                              The treatment programs to be done
                            </span>
                          </h5>
                          <div className="d-flex justify-content-end gap-2 mt-3">
                            <button
                              className="btn btn-sm bg-soft-danger text-danger"
                              onClick={() => {
                                if (values.programs.length === 1) return;
                                arrayHelpers.pop();
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() =>
                                arrayHelpers.push({
                                  treatmentId: null,
                                  therapistId: null,
                                  aimOfTreatment: "",
                                  sessionFrequency: null,
                                  sessionDuration: null,
                                })
                              }
                            >
                              Add Items
                            </button>
                          </div>
                        </div>

                        <div className="accordion proposal-faq-accordion">
                          {values.programs &&
                            values.programs.map((program, index) => (
                              <AccordionItem
                                key={index}
                                id={`programs-${index}`}
                                header={`Program ${index + 1}`}
                              >
                                <div className="form-group row mb-3 align-items-center">
                                  <label className="col-sm-3 col-form-label">
                                    Treatment Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <SelectDropdown
                                      name={`programs[${index}].treatmentId`}
                                      options={treatmentTypes.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                      }))}
                                      selectedOption={values.programs[index].treatmentId}
                                      placeholder={"Select Treatment"}
                                      onSelectOption={(option) =>
                                        setFieldValue(`programs[${index}].treatmentId`, option.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="form-group row mb-3 align-items-center">
                                  <label className="col-sm-3 col-form-label">
                                    Therapist Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <SelectDropdown
                                      name={`programs[${index}].therapistId`}
                                      options={therapists.map((item) => ({
                                        label: item.fullName,
                                        value: item.id,
                                      }))}
                                      selectedOption={values.programs[index].therapistId}
                                      placeholder={"Select Therapist"}
                                      onSelectOption={(option) =>
                                        setFieldValue(`programs[${index}].therapistId`, option.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="form-group row mb-3 align-items-center">
                                  <label className="col-sm-3 col-form-label">
                                    Aim of Treatment{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <Field
                                      name={`programs[${index}].aimOfTreatment`}
                                    >
                                      {({ field, meta }) => (
                                        <>
                                          <input
                                            type="text"
                                            className={`form-control ${meta.error ? "is-invalid" : ""
                                              }`}
                                            placeholder="Please specify aim of the treatment"
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
                                    Session Frequency{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <Field
                                      name={`programs[${index}].sessionFrequency`}
                                    >
                                      {({ field, meta }) => (
                                        <>
                                          <input
                                            type="number"
                                            className={`form-control ${meta.error ? "is-invalid" : ""
                                              }`}
                                            placeholder="Please specify the session frequency"
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
                                    Session Duration (minutes){" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <Field
                                      name={`programs[${index}].sessionDuration`}
                                    >
                                      {({ field, meta }) => (
                                        <>
                                          <input
                                            type="number"
                                            className={`form-control ${meta.error ? "is-invalid" : ""
                                              }`}
                                            placeholder="Please specify the session duration"
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
                                <div className="d-flex justify-content-end mt-3">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                    }}
                                  >
                                    Delete Program
                                  </button>
                                </div>
                              </AccordionItem>
                            ))}
                        </div>
                      </div>
                    )}
                  />
                  <hr className="border-dashed" />
                  <FieldArray
                    name="targets"
                    render={(arrayHelpers) => (
                      <div className="col-lg-12">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                          <h5 className="fw-bold mb-0 me-4">
                            <span className="d-block mb-2">
                              Targeted Behaviors:
                            </span>
                            <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                              The behaviors to be achieved
                            </span>
                          </h5>
                          <div className="d-flex justify-content-end gap-2 mt-3">
                            <button
                              className="btn btn-sm bg-soft-danger text-danger"
                              onClick={() => {
                                if (values.targets.length === 1) return;
                                arrayHelpers.pop();
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() =>
                                arrayHelpers.push({
                                  currentAbility: null,
                                  shortTermTarget: null,
                                  mediaTools: null,
                                })
                              }
                            >
                              Add Items
                            </button>
                          </div>
                        </div>
                        <div className="accordion proposal-faq-accordion">
                          {values.targets &&
                            values.targets.map((target, index) => (
                              <AccordionItem
                                key={index}
                                id={`target-${index}`}
                                header={`Target ${index + 1}`}
                              >
                                <div className="form-group row mb-3 align-items-center">
                                  <label className="col-sm-3 col-form-label">
                                    Target Behavior{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <Field name={`targets[${index}].targetBehavior`}>
                                      {({ field, meta }) => (
                                        <>
                                          <input
                                            type="text"
                                            className={`form-control ${meta.error ? "is-invalid" : ""
                                              }`}
                                            placeholder="Please specify the child's target behavior"
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
                                    Child&apos;s Current Ability{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <Field
                                      name={`targets[${index}].currentAbility`}
                                    >
                                      {({ field, meta }) => (
                                        <>
                                          <input
                                            type="text"
                                            className={`form-control ${meta.error ? "is-invalid" : ""
                                              }`}
                                            placeholder="Please specify the child's current ability"
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
                                    Short-term Target:{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <Field
                                      name={`targets[${index}].shortTermTarget`}
                                    >
                                      {({ field, meta }) => (
                                        <>
                                          <input
                                            type="text"
                                            className={`form-control ${meta.error ? "is-invalid" : ""
                                              }`}
                                            placeholder="Please specify the short-term target"
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
                                    Media/Tools{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <Field
                                      name={`targets[${index}].mediaTools`}
                                    >
                                      {({ field, meta }) => (
                                        <>
                                          <input
                                            type="text"
                                            className={`form-control ${meta.error ? "is-invalid" : ""
                                              }`}
                                            placeholder="Please specify the media or tools"
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
                            ))}
                        </div>
                        <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
                          <button
                            className="btn btn-light-brand"
                            onClick={() => navigate(-1)}
                          >
                            <FiX size={16} className="me-2" />
                            <span>Cancel</span>
                          </button>
                          <button type="submit" className="btn btn-primary">
                            <FiCheck size={16} className="me-2" />
                            <span>Edit Plan</span>
                          </button>
                        </div>
                      </div>
                    )}
                  ></FieldArray>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div >
    </>
  );
};

export default PlanEditContent;

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
