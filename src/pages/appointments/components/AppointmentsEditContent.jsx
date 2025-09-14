import React, { useEffect } from "react";
import SelectDropdown from "@/components/shared/SelectDropdown";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  // fetchAllPsychologists,
  fetchAllPsychologistsWithAvailability,
  // fetchAllTherapists,
  fetchAllTherapistsWithAvailability,
} from "@/store/slice/employeeSlice";
import { fetchAllClients } from "@/store/slice/clientSlice";
import { FiCheck, FiX } from "react-icons/fi";
import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { appointmentTypeOptions, roomOptions } from "@/utils/options";
import { appointmentBaseSchema } from "@/schemas/appointmentSchema";
import { updateAppointmentById } from "@/store/slice/appointmentSlice";

const AppointmentsEditContent = ({ appointmentData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { clients } = useSelector((state) => state.clients);
  const { isLoading: updateLoading } = useSelector(
    (state) => state.appointments
  );
  const { psychologists, therapists } = useSelector((state) => state.employees);

  const appointmentTypes = appointmentTypeOptions;
  const rooms = roomOptions;

  const onSubmit = async (values) => {
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

    dispatch(
      updateAppointmentById({
        appointmentId: id,
        data: formattedValues,
      })
    )
      .unwrap()
      .then(() => navigate(`/appointments/${id}`))
      .catch((error) => console.log("Error", error));
  };

  useEffect(() => {
    dispatch(fetchAllClients());
    if (appointmentData) {
      const params = {
        appointmentDate: format(
          new Date(appointmentData.appointmentDate),
          "yyyy-MM-dd"
        ),
        timeStart: appointmentData?.appointmentTime.split(" - ")[0],
        timeEnd: appointmentData?.appointmentTime.split(" - ")[1],
      };

      if (appointmentData?.appointmentType.toLowerCase() === "treatment") {
        dispatch(fetchAllTherapistsWithAvailability(params));
      } else {
        dispatch(fetchAllPsychologistsWithAvailability(params));
      }
    }
  }, [appointmentData]);
  return (
    <>
      <div className="col-lg-12">
        <div className="card stretch stretch-full">
          <div className="card-body">
            <div className="mb-5 d-flex align-items-center justify-content-between">
              <h5 className="fw-bold mb-0 me-4">
                <span className="d-block mb-2">Edit Appointment</span>
                <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                  Last Edited:{" "}
                  {appointmentData?.updatedAt &&
                    format(appointmentData.updatedAt, "dd MMM yyyy, HH:mm aa")}
                </span>
              </h5>
            </div>
            <Formik
              initialValues={{
                title: appointmentData?.title,
                clientId: appointmentData?.clientId,
                picId: appointmentData?.picId,
                roomId: appointmentData?.roomId,
                appointmentType: appointmentData?.appointmentType,
                appointmentDate: appointmentData?.appointmentDate,
                timeStart: appointmentData?.appointmentTime.split(" - ")[0],
                timeEnd: appointmentData?.appointmentTime.split(" - ")[1],
              }}
              validationSchema={appointmentBaseSchema}
              enableReinitialize
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue, errors }) => (
                <Form>
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <label htmlFor="title" className="form-label">
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
                      <label htmlFor="appointmentType" className="form-label">
                        Appointment Type <span className="text-danger">*</span>
                      </label>
                      <SelectDropdown
                        name="appointmentType"
                        options={appointmentTypes}
                        isDisabled={true}
                        selectedOption={values.appointmentType}
                        placeholder={"Select Appointment Type"}
                        // onSelectOption={(option) => {
                        //     setFieldValue('appointmentType', option.value)
                        //     if (option.value.toLowerCase() === 'treatment') {
                        //         dispatch(fetchAllTherapists())
                        //     } else {
                        //         dispatch(fetchAllPsychologists())
                        //     }
                        // }}
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <label htmlFor="clientId" className="form-label">
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
                          setFieldValue("clientId", option.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-6 mb-4">
                      <label htmlFor="roomId" className="form-label">
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
                      <label htmlFor="appointmentDate" className="form-label">
                        Appointment Date <span className="text-danger">*</span>
                      </label>
                      <div className="input-group date flex-column">
                        <Field name="appointmentDate">
                          {({ meta }) => (
                            <>
                              <DatePicker
                                name="appointmentDate"
                                placeholderText="Select Appointment Date"
                                dateFormat={"dd MMM yyyy"}
                                showPopperArrow={false}
                                selected={values.appointmentDate}
                                onChange={(date) => {
                                  setFieldValue(
                                    "appointmentDate",
                                    format(date, "yyyy-MM-dd")
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
                      <label htmlFor="picId" className="form-label">
                        PIC Name <span className="text-danger">*</span>
                      </label>
                      <SelectDropdown
                        isDisabled={!values.appointmentType}
                        name="picId"
                        options={
                          values.appointmentType?.toLowerCase() === "treatment"
                            ? therapists.map((item) => ({
                                label: `[Therapist] ${item.fullName}`,
                                value: item.id,
                              }))
                            : psychologists.map((item) => ({
                                label: `[Psychologist] ${item.fullName}`,
                                value: item.id,
                              }))
                        }
                        selectedOption={values.picId}
                        placeholder={"Select PIC"}
                        onSelectOption={(option) => {
                          setFieldValue("picId", option.value);
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="timeStart" className="form-label">
                        Start Time <span className="text-danger">*</span>
                      </label>
                      <Field name="timeStart">
                        {({ field, meta }) => (
                          <>
                            <input
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
                              type="time"
                              id="timeEnd"
                              name="timeEnd"
                              value={values.endTime}
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
                      <span>Edit Appointment</span>
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

export default AppointmentsEditContent;
