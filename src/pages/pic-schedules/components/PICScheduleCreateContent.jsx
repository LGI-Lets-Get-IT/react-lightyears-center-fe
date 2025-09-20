import React, { useEffect, useState } from "react";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPsychologists,
  fetchAllTherapists,
} from "@/store/slice/employeeSlice";
import { FiCheck, FiX } from "react-icons/fi";
import { Field, FieldArray, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import WeekdayPicker from "@/components/picker/WeekdayPicker";
import TimePicker from "@/components/picker/TimePicker";
import { createPicSchedule } from "@/store/slice/picScheduleSlice";
import { picScheduleSchema } from "@/schemas/picScheduleSchema";

const PICScheduleCreateContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading: createLoading } = useSelector(
    (state) => state.picSchedules
  );
  const { psychologists, therapists } = useSelector((state) => state.employees);

  const onSubmit = async (values, actions) => {
    console.log("ASFASFS", values, actions);
    dispatch(createPicSchedule(values))
      .unwrap()
      .then(() => navigate("/employee-availabilities"))
      .catch((error) => console.log("Error", error));
  };

  useEffect(() => {
    dispatch(fetchAllPsychologists());
    dispatch(fetchAllTherapists());
  }, []);
  return (
    <>
      <div className="col-lg-12">
        <div className="card stretch stretch-full">
          <div className="card-body">
            <div className="mb-5 d-flex align-items-center justify-content-between">
              <h5 className="fw-bold mb-0 me-4">
                <span className="d-block mb-2">Create PIC Schedule</span>
                <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                  Information about the PIC schedule
                </span>
              </h5>
            </div>
            <Formik
              initialValues={{
                employeeId: null,
                schedules: [],
              }}
              validationSchema={picScheduleSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="row">
                    <div className="col-lg-12 mb-4">
                      <label className="form-label">
                        PIC Name <span className="text-danger">*</span>
                      </label>
                      <SelectDropdown
                        name="employeeId"
                        options={[...psychologists, ...therapists].map(
                          (employee) => ({
                            label: `[${employee.roleName}] ${employee.fullName}`,
                            value: employee.id,
                          })
                        )}
                        selectedOption={values.employeeId}
                        placeholder={"Select PIC"}
                        onSelectOption={(option) => {
                          setFieldValue("employeeId", option.value);
                        }}
                      />
                    </div>
                  </div>
                  <FieldArray
                    name="schedules"
                    render={(arrayHelpers) => (
                      <div className="col-lg-12">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                          <h5 className="fw-bold mb-0 me-4">
                            <span className="d-block mb-2">
                              Available Schedules
                            </span>
                            <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                              The available schedules for the PIC
                            </span>
                          </h5>
                          <div className="d-flex justify-content-end gap-2 mt-3">
                            <button
                              type="button"
                              className="btn btn-sm bg-soft-danger text-danger"
                              onClick={() => {
                                // if (values.schedules.length === 1) return;
                                arrayHelpers.pop();
                              }}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              onClick={() =>
                                arrayHelpers.push({
                                  availableDays: [],
                                  availableStartTime: null,
                                  availableEndTime: null,
                                })
                              }
                            >
                              Add Items
                            </button>
                          </div>
                        </div>

                        <div className="accordion proposal-faq-accordion">
                          {values.schedules &&
                            values.schedules.map((schedule, index) => (
                              <AccordionItem
                                key={index}
                                id={`schedules-${index}`}
                                header={`Schedule ${index + 1}`}
                              >
                                <div className="form-group row mb-3 align-items-center">
                                  <label className="col-sm-3 col-form-label">
                                    Available Day(s)
                                    <span className="text-danger"> *</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <WeekdayPicker
                                      name={`schedules[${index}].availableDays`}
                                      onChange={(options) => {
                                        setFieldValue(
                                          `schedules[${index}].availableDays`,
                                          options.map((option) => option.value)
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row mb-3 align-items-center">
                                  <label className="col-sm-3 col-form-label">
                                    Available Start Time
                                    <span className="text-danger"> *</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <Field name="availableStartTime">
                                      {() => (
                                        <>
                                          <TimePicker
                                            name={`schedules[${index}].availableStartTime`}
                                            onChange={(option) => {
                                              setFieldValue(
                                                `schedules[${index}].availableStartTime`,
                                                option.value
                                              );
                                            }}
                                          />
                                          {/* <input
                                            type="time"
                                            id="timeStart"
                                            name="timeStart"
                                            value={values.timeStart}
                                            className={`form-control ${
                                              meta.error ? "is-invalid" : ""
                                            }`}
                                            required
                                            {...field}
                                          />
                                          {meta.error && (
                                            <div className="mt-1 text-danger">
                                              {meta.error}
                                            </div>
                                          )} */}
                                        </>
                                      )}
                                    </Field>
                                  </div>
                                  {/* <div className="col-sm-9">
                                    <WeekdayPicker
                                      onChange={(option) =>
                                        setFieldValue(
                                          `schedules.${index}.availableDay`,
                                          option
                                        )
                                      }
                                    />
                                  </div> */}
                                </div>
                                <div className="form-group row mb-3 align-items-center">
                                  <label className="col-sm-3 col-form-label">
                                    Available End Time
                                    <span className="text-danger"> *</span>
                                  </label>
                                  <div className="col-sm-9">
                                    <Field name="timeStart">
                                      {() => (
                                        <>
                                          <TimePicker
                                            name={`schedules[${index}].availableEndTime`}
                                            onChange={(option) => {
                                              setFieldValue(
                                                `schedules[${index}].availableEndTime`,
                                                option.value
                                              );
                                            }}
                                          />
                                          {/* <input
                                            type="time"
                                            id="timeStart"
                                            name="timeStart"
                                            value={values.timeStart}
                                            className={`form-control ${
                                              meta.error ? "is-invalid" : ""
                                            }`}
                                            required
                                            {...field}
                                          />
                                          {meta.error && (
                                            <div className="mt-1 text-danger">
                                              {meta.error}
                                            </div>
                                          )} */}
                                        </>
                                      )}
                                    </Field>
                                  </div>
                                  {/* <div className="col-sm-9">
                                    <WeekdayPicker
                                      onChange={(option) =>
                                        setFieldValue(
                                          `schedules.${index}.availableDay`,
                                          option
                                        )
                                      }
                                    />
                                  </div> */}
                                </div>
                              </AccordionItem>
                            ))}
                        </div>
                      </div>
                    )}
                  />
                  <div className="card-body additional-info">
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
                        disabled={createLoading}
                      >
                        {createLoading ? (
                          <div
                            className="spinner-border spinner-border-sm text-white me-2"
                            role="status"
                          />
                        ) : (
                          <FiCheck size={16} className="me-2" />
                        )}
                        <span>Create Schedule</span>
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default PICScheduleCreateContent;

const AccordionItem = ({ id, header, children }) => {
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
        <div className="accordion-body p-3 rounded">{children}</div>
      </div>
    </div>
  );
};
