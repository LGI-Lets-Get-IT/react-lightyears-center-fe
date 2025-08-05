import React, { useEffect, useState } from "react";
import TaskDateRange from "@/components/tasks/TaskDateRange";
import TaskStatus from "@/components/tasks/TaskStatus";
// import ReactQuill from 'react-quill';
import MultiSelectTags from "@/components/shared/MultiSelectTags";
import MultiSelectImg from "@/components/shared/MultiSelectImg";
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { FiX } from "react-icons/fi";
import { Field, FieldArray, Form, Formik } from "formik";
import { fetchAppointmentForTreatmentProgress } from "@/store/slice/appointmentSlice";
import { treatmentSessionSchema } from "@/schemas/treatmentSessionSchema";
import { createSession } from "@/store/slice/treatmentSessionSlice";

const AddProgressModal = ({ setOpenModal }) => {
  const dispatch = useDispatch();
  const { plan } = useSelector((state) => state.treatmentPlans);
  const { appointments } = useSelector((state) => state.appointments);
  const { isLoading: createLoading } = useSelector(
    (state) => state.treatmentSessions
  );

  const handleAddProgress = (values) => {
    dispatch(createSession(values))
      .unwrap()
      .then(() => setOpenModal(false))
      .catch((error) => {
        return;
      });
  };

  useEffect(() => {
    dispatch(
      fetchAppointmentForTreatmentProgress({
        params: {
          clientId: plan?.client?.id,
        },
      })
    );
  }, []);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      {/* // <div className="modal fade" id="addNewProgress" tabIndex="-1"> */}
      <div className="modal-dialog modal-lg" role="document">
        <Formik
          initialValues={{
            planId: plan?.id,
            programId: null,
            appointmentId: null,
            clientId: plan?.client?.id,
            sessions: [],
          }}
          validationSchema={treatmentSessionSchema}
          onSubmit={handleAddProgress}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Progress</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setOpenModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="form-group mb-4">
                    <label className="form-label">Linked Appointment </label>
                    <SelectDropdown
                      name={"appointmentId"}
                      options={appointments.map((appointment) => ({
                        label: `[${appointment?.appointmentType}] ${appointment?.title}`,
                        value: appointment?.id,
                      }))}
                      selectedOption={values.appointmentId}
                      placeholder={"Select Appointment"}
                      onSelectOption={(option) => {
                        setFieldValue("appointmentId", option.value);
                      }}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="form-label">Treatment Name</label>
                    <SelectDropdown
                      name="programId"
                      options={plan?.programs.map((program) => ({
                        label: program?.treatmentName,
                        value: program?.id,
                      }))}
                      selectedOption={values.programId}
                      placeholder={"Select Program"}
                      onSelectOption={(option) => {
                        setFieldValue("programId", option.value);
                      }}
                    />
                  </div>
                  <FieldArray
                    name="sessions"
                    render={(arrayHelpers) => (
                      <div className="form-group mb-4">
                        <div className="table-responsive">
                          <table
                            className="table table-bordered overflow-hidden"
                            id="tab_logic"
                          >
                            <thead>
                              <tr className="single-item">
                                <th className="text-center">#</th>
                                <th className="text-center wd-450">
                                  Short-term Goals
                                </th>
                                <th className="text-center wd-450">
                                  Activities
                                </th>
                                <th className="text-center wd-450">Progress</th>
                                <th className="text-center wd-50">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {values.sessions &&
                                values.sessions.map((session, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <Field
                                        name={`sessions[${index}].shortTermGoals`}
                                      >
                                        {({ field, meta }) => (
                                          <input
                                            name="shortTermGoals"
                                            type="text"
                                            placeholder="Short-term Goals"
                                            className={`form-control ${
                                              meta.error ? "is-invalid" : ""
                                            }`}
                                            {...field}
                                          />
                                        )}
                                      </Field>
                                    </td>
                                    <td>
                                      <Field
                                        name={`sessions[${index}].activity`}
                                      >
                                        {({ field, meta }) => (
                                          <input
                                            name="activity"
                                            type="text"
                                            placeholder="Activity"
                                            className={`form-control ${
                                              meta.error ? "is-invalid" : ""
                                            }`}
                                            {...field}
                                          />
                                        )}
                                      </Field>
                                    </td>
                                    <td>
                                      <Field
                                        name={`sessions[${index}].progress`}
                                      >
                                        {({ field, meta }) => (
                                          <input
                                            name="progress"
                                            type="text"
                                            placeholder="Progress"
                                            className={`form-control ${
                                              meta.error ? "is-invalid" : ""
                                            }`}
                                            {...field}
                                          />
                                        )}
                                      </Field>
                                    </td>
                                    <td className="text-center">
                                      <button
                                        type="button"
                                        className="btn btn-light-brand"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        <FiX size={16} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <button
                            className="btn btn-sm bg-soft-danger text-danger"
                            onClick={() => arrayHelpers.pop()}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              arrayHelpers.push({
                                shortTermGoals: null,
                                activity: null,
                                progress: null,
                              })
                            }
                          >
                            Add Items
                          </button>
                        </div>
                      </div>
                    )}
                  ></FieldArray>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={createLoading}
                  >
                    Add Progress
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProgressModal;
