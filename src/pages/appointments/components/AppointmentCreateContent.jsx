import React, { useEffect, useRef } from "react";
import SelectDropdown from "@/components/shared/SelectDropdown";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPsychologists,
  fetchAllTherapists,
} from "@/store/slice/employeeSlice";
import { fetchAllClients } from "@/store/slice/clientSlice";
import { FiCheck, FiX } from "react-icons/fi";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { appointmentTypeOptions, roomOptions } from "@/utils/options";
import { appointmentSchema } from "@/schemas/appointmentSchema";
import { makeAppointment } from "@/store/slice/appointmentSlice";

const AppointmentCreateContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();
  const { clients } = useSelector((state) => state.clients);
  const { isLoading: createLoading } = useSelector(
    (state) => state.appointments
  );
  const { psychologists, therapists } = useSelector((state) => state.employees);

  const appointmentTypes = appointmentTypeOptions;
  const rooms = roomOptions;

  const onSubmit = async (values, actions) => {
    const startDateTimeLocal = new Date(
      `${format(values.appointmentDate, "yyyy-MM-dd")}T${values.timeStart}`
    );
    const endDateTimeLocal = new Date(
      `${format(values.appointmentDate, "yyyy-MM-dd")}T${values.timeEnd}`
    );
    const formattedValues = {
      ...values,
      timeStart: startDateTimeLocal.toISOString(), // UTC ISO string
      timeEnd: endDateTimeLocal.toISOString(),
    };

    dispatch(makeAppointment(formattedValues))
      .unwrap()
      .then(() => navigate(`/appointments/`))
      .catch((error) => console.log("Error", error));
  };

  useEffect(() => {
    dispatch(fetchAllClients());
  }, []);

  const formatDropdown = (dropdownItem) => {
    console.log("DROPDOWNITEM", dropdownItem);
    const formValue = formRef.current?.values;
    const selectedDay = formValue?.appointmentDate
      ? format(formValue.appointmentDate, "EEEE")
      : null;
    const selectedStartTime = formValue?.timeStart;
    console.log(
      "selectedDay, selectedStartTime",
      selectedDay,
      selectedStartTime
    );
    console.log("formValue?.appointmentDate", formValue?.appointmentDate);

    // Find a schedule that matches the selected day
    const dayBasedSchedule = dropdownItem.schedules?.find((schedule) =>
      schedule.availableDays.includes(selectedDay)
    );

    // Check if selected time is within range
    const isTimeInRange =
      dayBasedSchedule &&
      selectedStartTime &&
      dayBasedSchedule.availableStartTime <= selectedStartTime &&
      selectedStartTime < dayBasedSchedule.availableEndTime;

    return {
      label: `[${dropdownItem.roleName}] ${dropdownItem.fullName}`,
      value: dropdownItem.id,
      additionalInfo: dayBasedSchedule
        ? `${dayBasedSchedule.availableStartTime} - ${dayBasedSchedule.availableEndTime}`
        : "No schedule for this day",
      isDisabled: !isTimeInRange, // disable if time not in range
    };
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="card stretch stretch-full">
          <div className="card-body">
            <div className="mb-5 d-flex align-items-center justify-content-between">
              <h5 className="fw-bold mb-0 me-4">
                <span className="d-block mb-2">Create Appointment</span>
                {/* <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                                    Last Edited: {appointmentData?.updatedAt && format(appointmentData.updatedAt, "dd MMM yyyy, HH:mm aa")}
                                </span> */}
              </h5>
            </div>
            <Formik
              initialValues={{
                title: null,
                clientId: null,
                picId: null,
                roomId: null,
                appointmentType: null,
                appointmentDate: null,
                timeStart: null,
                timeEnd: null,
              }}
              validationSchema={appointmentSchema}
              onSubmit={onSubmit}
              innerRef={formRef}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <label className="form-label">
                        Appointment Title <span className="text-danger">*</span>
                      </label>
                      <Field name="title">
                        {({ field, meta }) => (
                          <>
                            <input
                              type="text"
                              className={`form-control ${
                                meta.error ? "is-invalid" : ""
                              }`}
                              name="title"
                              placeholder="Enter Appointment Title"
                              value={values.title}
                              {...field}
                            />
                            {meta.error && (
                              <div className="mt-1 text-danger">
                                {meta.error}
                              </div>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <label className="form-label">
                        Appointment Type <span className="text-danger">*</span>
                      </label>
                      <SelectDropdown
                        name="appointmentType"
                        options={appointmentTypes}
                        selectedOption={values.appointmentType}
                        placeholder={"Select Appointment Type"}
                        onSelectOption={(option) => {
                          if (option.value.toLowerCase() === "treatment") {
                            dispatch(fetchAllTherapists());
                          } else {
                            dispatch(fetchAllPsychologists());
                          }
                          setFieldValue("appointmentType", option.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <label className="form-label">
                        Client Name <span className="text-danger">*</span>
                      </label>
                      <SelectDropdown
                        name="clientId"
                        options={clients.map((item) => ({
                          label: item.fullName,
                          value: item.id,
                        }))}
                        selectedOption={values.clientId}
                        placeholder={"Select Client"}
                        onSelectOption={(option) => {
                          setFieldValue("clientId", option.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <label className="form-label">
                        Room Name <span className="text-danger">*</span>
                      </label>
                      <SelectDropdown
                        name="roomId"
                        options={rooms}
                        selectedOption={values.roomId}
                        placeholder={"Select Room"}
                        onSelectOption={(option) => {
                          setFieldValue("roomId", option.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <label className="form-label">
                        Appointment Date <span className="text-danger">*</span>
                      </label>
                      <div className="input-group date flex-column">
                        <Field name="appointmentDate">
                          {({ meta }) => (
                            <>
                              <DatePicker
                                disabled={!values.appointmentType}
                                autoComplete="off"
                                name="appointmentDate"
                                placeholderText="YYYY-MM-DD"
                                dateFormat={"yyyy-MM-dd"}
                                showPopperArrow={false}
                                selected={values.appointmentDate}
                                onChange={(date) => {
                                  if (
                                    values.appointmentType.toLowerCase() ===
                                    "treatment"
                                  ) {
                                    dispatch(
                                      fetchAllTherapists({
                                        params: {
                                          appointmentDate: `${format(
                                            date,
                                            "yyyy-MM-dd"
                                          )}`,
                                          timeStart: values.timeStart,
                                          timeEnd: values.timeEnd,
                                        },
                                      })
                                    );
                                  } else {
                                    dispatch(
                                      fetchAllPsychologists({
                                        params: {
                                          appointmentDate: `${format(
                                            date,
                                            "yyyy-MM-dd"
                                          )}`,
                                          timeStart: values.timeStart,
                                          timeEnd: values.timeEnd,
                                        },
                                      })
                                    );
                                  }
                                  setFieldValue(
                                    "appointmentDate",
                                    // date,
                                    format(date, "yyyy-MM-dd HH:mm:ss xx")
                                  );
                                }}
                                className={`form-control ${
                                  meta.error ? "is-invalid" : ""
                                }`}
                                popperPlacement="bottom-start"
                                calendarContainer={({ children }) => (
                                  <div className="bg-white react-datepicker">
                                    {children}
                                  </div>
                                )}
                              />
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
                    <div className="col-lg-6 mb-4">
                      <label className="form-label">
                        PIC Name <span className="text-danger">*</span>
                      </label>
                      <SelectDropdown
                        isDisabled={
                          !values.appointmentType ||
                          !values.appointmentDate ||
                          !values.timeStart ||
                          !values.timeEnd
                        }
                        name="picId"
                        options={
                          values.appointmentType?.toLowerCase() === "treatment"
                            ? therapists.map((item) => formatDropdown(item))
                            : psychologists.map((item) => formatDropdown(item))
                        }
                        selectedOption={values.picId}
                        placeholder={"Select PIC"}
                        onSelectOption={(option) => {
                          setFieldValue("picId", option.value);
                        }}
                      />
                      {console.log("psychologists", psychologists)}
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="timeStart" className="form-label">
                        Start Time <span className="text-danger">*</span>
                      </label>
                      <Field name="timeStart">
                        {({ field, meta }) => (
                          <>
                            <input
                              disabled={!values.appointmentType}
                              type="time"
                              id="timeStart"
                              name="timeStart"
                              value={values.timeStart}
                              className={`form-control ${
                                meta.error ? "is-invalid" : ""
                              }`}
                              required
                              {...field}
                              onChange={(e) => {
                                setFieldValue("timeStart", e.target.value);
                                if (
                                  values.appointmentType.toLowerCase() ===
                                  "treatment"
                                ) {
                                  dispatch(
                                    fetchAllTherapists({
                                      params: {
                                        appointmentDate: `${format(
                                          values.appointmentDate,
                                          "yyyy-MM-dd"
                                        )}`,
                                        timeStart: e.target.value,
                                        timeEnd: values.timeEnd,
                                      },
                                    })
                                  );
                                } else {
                                  dispatch(
                                    fetchAllPsychologists({
                                      params: {
                                        appointmentDate: `${format(
                                          values.appointmentDate,
                                          "yyyy-MM-dd"
                                        )}`,
                                        timeStart: e.target.value,
                                        timeEnd: values.timeEnd,
                                      },
                                    })
                                  );
                                }
                              }}
                            />
                            {meta.error && (
                              <div className="mt-1 text-danger">
                                {meta.error}
                              </div>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="timeEnd" className="form-label">
                        End Time <span className="text-danger">*</span>
                      </label>
                      <Field name="timeEnd">
                        {({ field, meta }) => (
                          <>
                            <input
                              disabled={!values.appointmentType}
                              type="time"
                              id="timeEnd"
                              name="timeEnd"
                              value={values.endTime}
                              className={`form-control ${
                                meta.error ? "is-invalid" : ""
                              }`}
                              required
                              {...field}
                              onChange={(e) => {
                                setFieldValue("timeEnd", e.target.value);
                                if (
                                  values.appointmentType.toLowerCase() ===
                                  "treatment"
                                ) {
                                  dispatch(
                                    fetchAllTherapists({
                                      params: {
                                        appointmentDate: `${format(
                                          values.appointmentDate,
                                          "yyyy-MM-dd"
                                        )}`,
                                        timeStart: values.timeStart,
                                        timeEnd: e.target.value,
                                      },
                                    })
                                  );
                                } else {
                                  dispatch(
                                    fetchAllPsychologists({
                                      params: {
                                        appointmentDate: `${format(
                                          values.appointmentDate,
                                          "yyyy-MM-dd"
                                        )}`,
                                        timeStart: values.timeStart,
                                        timeEnd: e.target.value,
                                      },
                                    })
                                  );
                                }
                              }}
                            />
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
                  <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
                    <button
                      className="btn btn-light-brand"
                      onClick={() => navigate(-1)}
                      type="button"
                    >
                      <FiX size={16} className="me-2" />
                      <span>Cancel</span>
                    </button>
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
                      <span>Create Appointment</span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {/* <AddProposal previtems={previtems} /> */}
    </>
  );
};

export default AppointmentCreateContent;
