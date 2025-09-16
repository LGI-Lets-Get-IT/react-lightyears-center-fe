import { useEffect, useRef, useState, useCallback } from "react";
import SelectDropdown from "@/components/shared/SelectDropdown";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  // fetchAllPsychologists,
  // fetchAllTherapists,
  fetchAllPsychologistsWithAvailability,
  fetchAllTherapistsWithAvailability,
} from "@/store/slice/employeeSlice";
import { fetchAllClients } from "@/store/slice/clientSlice";
import { FiCheck, FiX } from "react-icons/fi";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { appointmentTypeOptions, roomOptions } from "@/utils/options";
import { appointmentCreateSchema } from "@/schemas/appointmentSchema";
import {
  makeAppointment,
  makeBulkAppointments,
} from "@/store/slice/appointmentSlice";
import {
  createTreatmentType,
  fetchAllTreatmentTypes,
} from "@/store/slice/treatmentTypeSlice";

const AppointmentCreateContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();
  const fetchPICTimeoutRef = useRef();

  const [selectedDates, setSelectedDates] = useState([]);
  const { clients } = useSelector((state) => state.clients);
  const { treatmentTypes } = useSelector((state) => state.treatmentTypes);
  const { isLoading: createLoading } = useSelector(
    (state) => state.appointments
  );
  const { psychologists, therapists } = useSelector((state) => state.employees);

  const appointmentTypes = appointmentTypeOptions;
  const rooms = roomOptions;

  const onSubmit = async (values) => {
    // Performance optimization: Reduced console logging
    // console.log("VALUES", values);

    try {
      if (values.appointmentType.toLowerCase() === "treatment") {
        // Handle bulk appointments for treatment type
        const appointments = values.appointmentDate.map((date, index) => {
          const startDateTimeLocal = new Date(
            `${format(date, "yyyy-MM-dd")}T${values.timeStart}`
          );
          const endDateTimeLocal = new Date(
            `${format(date, "yyyy-MM-dd")}T${values.timeEnd}`
          );

          // Find treatment name from treatment types
          const selectedTreatment = treatmentTypes.find(
            (treatment) => treatment.id === values.treatmentId
          );
          const treatmentName = selectedTreatment
            ? selectedTreatment.name
            : "Treatment";

          return {
            title: `${values.title} - Session ${index + 1} - ${treatmentName}`,
            clientId: values.clientId,
            picId: values.picId,
            roomId: values.roomId,
            appointmentType: values.appointmentType,
            // appointmentDate: date,
            appointmentDate: format(date, "yyyy-MM-dd HH:mm:ss xx"),
            timeStart: startDateTimeLocal.toISOString(),
            timeEnd: endDateTimeLocal.toISOString(),
            treatmentId: values.treatmentId,
          };
        });

        // console.log("BULK APPOINTMENTS", appointments);

        // Use the new bulk appointment API
        dispatch(makeBulkAppointments({ appointments }))
          .unwrap()
          .then(() => navigate(`/appointments/`))
          .catch((error) => console.log("Error", error));
      } else {
        // Handle single appointment for consultation/assessment
        const startDateTimeLocal = new Date(
          `${format(values.appointmentDate, "yyyy-MM-dd")}T${values.timeStart}`
        );
        const endDateTimeLocal = new Date(
          `${format(values.appointmentDate, "yyyy-MM-dd")}T${values.timeEnd}`
        );

        const formattedValues = {
          ...values,
          appointmentDate: format(
            values.appointmentDate,
            "yyyy-MM-dd HH:mm:ss xx"
          ),
          timeStart: startDateTimeLocal.toISOString(),
          timeEnd: endDateTimeLocal.toISOString(),
        };

        // console.log("SINGLE APPOINTMENT", formattedValues);

        dispatch(makeAppointment(formattedValues))
          .unwrap()
          .then(() => navigate(`/appointments/`))
          .catch((error) => console.log("Error", error));
      }
    } catch (error) {
      console.log("Error in onSubmit", error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllClients());
  }, [dispatch]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (fetchPICTimeoutRef.current) {
        clearTimeout(fetchPICTimeoutRef.current);
      }
    };
  }, []);

  const formatDropdown = (dropdownItem, formValues) => {
    // Performance optimization: Reduced console logging
    // console.log("=== FORMATDROPDOWN DEBUG ===");
    // console.log("DROPDOWNITEM", dropdownItem);
    // console.log("FORMVALUES", formValues);
    // console.log(
    //   `hasExistingAppointment flag:`,
    //   dropdownItem.hasExistingAppointment
    // );
    // console.log(`isAvailable flag:`, dropdownItem.isAvailable);

    const selectedStartTime = formValues?.timeStart;
    const selectedEndTime = formValues?.timeEnd;

    // Handle multiple dates for bulk appointments
    // Check if appointment type is treatment to determine if we should expect an array
    const isTreatmentType =
      formValues?.appointmentType?.toLowerCase() === "treatment";

    let appointmentDates = [];
    if (isTreatmentType) {
      // For treatment type, expect an array
      appointmentDates = Array.isArray(formValues?.appointmentDate)
        ? formValues.appointmentDate
        : [];
    } else {
      // For other types, expect a single date
      appointmentDates = formValues?.appointmentDate
        ? [formValues.appointmentDate]
        : [];
    }

    // Performance optimization: Reduced console logging
    // console.log("appointmentDates", appointmentDates);
    // console.log("isTreatmentType", isTreatmentType);
    // console.log(
    //   "selectedStartTime, selectedEndTime",
    //   selectedStartTime,
    //   selectedEndTime
    // );

    // Early return if no valid dates
    if (appointmentDates.length === 0) {
      return {
        label: `[${dropdownItem.roleName}] ${dropdownItem.fullName}`,
        value: dropdownItem.id,
        additionalInfo: "Select dates first",
        isDisabled: true,
      };
    }

    // Early return if no valid times
    if (!selectedStartTime || !selectedEndTime) {
      return {
        label: `[${dropdownItem.roleName}] ${dropdownItem.fullName}`,
        value: dropdownItem.id,
        additionalInfo: "Select start and end times",
        isDisabled: true,
      };
    }

    // Check availability for all selected dates
    let isAvailableForAllDates = true;
    let availabilityInfo = [];
    let conflictingDates = [];

    // Check if PIC has existing appointment (from backend) - this is a global flag for all dates
    const hasExistingAppointment = dropdownItem.hasExistingAppointment || false;
    // console.log(`Global hasExistingAppointment flag:`, hasExistingAppointment);

    appointmentDates.forEach((date) => {
      // Validate date before processing
      if (!date || isNaN(new Date(date).getTime())) {
        console.warn(`Invalid date encountered:`, date);
        return; // Skip this date
      }

      // Fix timezone issue: Use the date as-is without timezone conversion
      let selectedDay;
      if (typeof date === "string") {
        // If it's a string, parse it as local date without timezone conversion
        const dateParts = date.split(" ")[0].split("-"); // Extract YYYY-MM-DD part
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed
        const day = parseInt(dateParts[2]);

        // Create date object in local timezone
        const dateObj = new Date(year, month, day);

        // Get day name using JavaScript's built-in method to avoid UTC conversion
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        selectedDay = dayNames[dateObj.getDay()];
      } else {
        // If it's already a Date object, use JavaScript's built-in method
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        selectedDay = dayNames[date.getDay()];
      }

      console.log(`Selected date: ${date}, Calculated day: ${selectedDay}`);

      // Find a schedule that matches the selected day
      const dayBasedSchedule = dropdownItem.schedules?.find((schedule) =>
        schedule.availableDays.includes(selectedDay)
      );

      // console.log(`Day schedule found:`, dayBasedSchedule);
      // console.log(
      //   `Available days:`,
      //   dropdownItem.schedules?.map((s) => s.availableDays)
      // );

      // Check if selected time is within range for this day
      const isTimeInRange =
        dayBasedSchedule &&
        selectedStartTime &&
        selectedEndTime &&
        dayBasedSchedule.availableStartTime <= selectedStartTime &&
        selectedEndTime <= dayBasedSchedule.availableEndTime;

      console.log(
        `Time check: ${selectedStartTime}-${selectedEndTime} vs ${dayBasedSchedule?.availableStartTime}-${dayBasedSchedule?.availableEndTime}`
      );
      console.log(`Is time in range: ${isTimeInRange}`);

      // For this specific day, check if PIC is available
      // If hasExistingAppointment is true (from backend), then PIC is not available on ANY of the selected dates
      const isAvailable = isTimeInRange && !hasExistingAppointment;

      if (!isAvailable) {
        isAvailableForAllDates = false;
        if (!isTimeInRange) {
          conflictingDates.push(`${selectedDay} (outside working hours)`);
        } else if (hasExistingAppointment) {
          // If hasExistingAppointment is true, add conflict for this day
          conflictingDates.push(`${selectedDay} (has existing appointment)`);
        }
      }

      availabilityInfo.push({
        day: selectedDay,
        schedule: dayBasedSchedule,
        isAvailable: isAvailable,
      });
    });

    // Create additional info text
    let additionalInfoText = "";
    if (appointmentDates.length === 0) {
      additionalInfoText = "Select dates first";
    } else if (isAvailableForAllDates) {
      const firstSchedule = availabilityInfo[0]?.schedule;
      additionalInfoText = firstSchedule
        ? `${firstSchedule.availableStartTime} - ${firstSchedule.availableEndTime} (Available for all selected days)`
        : "Available for all selected days";
    } else {
      additionalInfoText = `Not available on: ${conflictingDates.join(", ")}`;
    }

    console.log(`Final result for ${dropdownItem.fullName}:`, {
      isAvailableForAllDates,
      conflictingDates,
      additionalInfoText,
      hasExistingAppointment,
      isDisabled: !isAvailableForAllDates || appointmentDates.length === 0,
    });

    return {
      label: `[${dropdownItem.roleName}] ${dropdownItem.fullName}`,
      value: dropdownItem.id,
      additionalInfo: additionalInfoText,
      isDisabled: !isAvailableForAllDates || appointmentDates.length === 0,
    };
  };

  // Debounced PIC fetching to reduce API calls
  const handleFetchPIC = useCallback(
    (updatedValues) => {
      // Clear existing timeout
      if (fetchPICTimeoutRef.current) {
        clearTimeout(fetchPICTimeoutRef.current);
      }

      // Set new timeout for debouncing
      fetchPICTimeoutRef.current = setTimeout(() => {
        const { appointmentType, appointmentDate, timeStart, timeEnd } =
          updatedValues;

        if (appointmentType && appointmentDate && timeStart && timeEnd) {
          // Handle both single date and multiple dates
          const dates = Array.isArray(appointmentDate)
            ? appointmentDate
            : [appointmentDate];

          // Validate that we have valid dates
          const validDates = dates.filter(
            (date) => date && !isNaN(new Date(date).getTime())
          );

          if (validDates.length === 0) {
            return;
          }

          // For bulk appointments, we need to check availability for all dates
          // Pass all selected dates to the backend for comprehensive checking
          const params = {
            appointmentDate: validDates.map((d) => {
              // Ensure consistent date formatting without timezone issues
              if (typeof d === "string") {
                return d.split("T")[0]; // Extract YYYY-MM-DD part
              }
              return format(d, "yyyy-MM-dd");
            }),
            timeStart,
            timeEnd,
          };

          if (appointmentType.toLowerCase() === "treatment") {
            dispatch(fetchAllTherapistsWithAvailability(params));
          } else {
            dispatch(fetchAllPsychologistsWithAvailability(params));
          }
        }
      }, 300); // 300ms debounce delay
    },
    [dispatch]
  );

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
                title: undefined,
                clientId: null,
                picId: null,
                roomId: null,
                appointmentType: null,
                appointmentDate: null,
                timeStart: undefined,
                timeEnd: undefined,
                treatmentId: null,
                // numberOfRepetition: null,
                // therapyDays: [],
              }}
              validationSchema={appointmentCreateSchema}
              onSubmit={onSubmit}
              innerRef={formRef}
            >
              {({ values, setFieldValue }) => {
                // Handle appointment type changes to clear appointment date when switching between single/multiple modes
                const currentAppointmentType =
                  values.appointmentType?.toLowerCase();
                const currentAppointmentDate = values.appointmentDate;

                // Check if we need to clear appointment date due to type change
                if (currentAppointmentType && currentAppointmentDate) {
                  const isCurrentlyTreatment =
                    currentAppointmentType === "treatment";
                  const isCurrentlyArray = Array.isArray(
                    currentAppointmentDate
                  );

                  // If switching from treatment (array) to non-treatment (single), clear the date
                  if (isCurrentlyArray && !isCurrentlyTreatment) {
                    console.log(
                      "Switching from treatment to single appointment, clearing appointment date"
                    );
                    setFieldValue("appointmentDate", null);
                  }
                  // If switching from non-treatment (single) to treatment (array), clear the date
                  else if (!isCurrentlyArray && isCurrentlyTreatment) {
                    console.log(
                      "Switching from single to treatment appointment, clearing appointment date"
                    );
                    setFieldValue("appointmentDate", null);
                  }
                }

                // Calculate PIC options based on current form values
                const picOptions = (() => {
                  console.log("Recalculating PIC options with values:", values);
                  if (values.appointmentType?.toLowerCase() === "treatment") {
                    return therapists.map((item) =>
                      formatDropdown(item, values)
                    );
                  } else {
                    console.log("TEST");
                    return psychologists.map((item) =>
                      formatDropdown(item, values)
                    );
                  }
                })();

                // Clear PIC selection if no available options (without useEffect)
                const availableOptions = picOptions.filter(
                  (option) => !option.isDisabled
                );

                // Clear PIC if no available options
                if (availableOptions.length === 0 && values.picId) {
                  console.log("No available PICs found, clearing selection");
                  setFieldValue("picId", null);
                }

                // Also clear PIC if the selected PIC is not in the current options
                if (values.picId && picOptions.length > 0) {
                  const selectedOption = picOptions.find(
                    (option) => option.value === values.picId
                  );
                  if (!selectedOption || selectedOption.isDisabled) {
                    console.log(
                      "Selected PIC is no longer available, clearing selection"
                    );
                    setFieldValue("picId", null);
                  }
                }

                return (
                  <Form>
                    <div className="row">
                      <div className="col-lg-6 mb-4">
                        <label htmlFor="title" className="form-label">
                          Appointment Title{" "}
                          <span className="text-danger">*</span>
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
                          Appointment Type{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <SelectDropdown
                          name="appointmentType"
                          options={appointmentTypes}
                          selectedOption={values.appointmentType}
                          placeholder={"Select Appointment Type"}
                          onSelectOption={(option) => {
                            if (option.value.toLowerCase() === "treatment") {
                              dispatch(fetchAllTreatmentTypes());
                            }
                            setFieldValue("appointmentType", option.value);
                            handleFetchPIC({
                              ...values,
                              appointmentType: option.value,
                            });
                          }}
                        />
                      </div>
                      <div className="col-lg-6 mb-4">
                        <label htmlFor="clientId" className="form-label">
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
                          Appointment Date{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="input-group date flex-column">
                          <Field name="appointmentDate">
                            {({ meta }) => (
                              <>
                                {values.appointmentType?.toLowerCase() ===
                                "treatment" ? (
                                  <DatePicker
                                    selectedDates={selectedDates}
                                    selectsMultiple={
                                      values.appointmentType?.toLowerCase() ===
                                      "treatment"
                                    }
                                    disabled={!values.appointmentType}
                                    autoComplete="off"
                                    name="appointmentDate"
                                    placeholderText="Select Appointment Date"
                                    dateFormat={"dd MMM yyyy"}
                                    showPopperArrow={false}
                                    shouldCloseOnSelect={false}
                                    onChange={(date) => {
                                      console.log("DATE", date);
                                      setSelectedDates(date);
                                      setFieldValue(
                                        "appointmentDate",
                                        date
                                        // format(date, "yyyy-MM-dd HH:mm:ss xx")
                                      );
                                      handleFetchPIC({
                                        ...values,
                                        appointmentDate: date,
                                      });
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
                                ) : (
                                  <DatePicker
                                    disabled={!values.appointmentType}
                                    autoComplete="off"
                                    name="appointmentDate"
                                    placeholderText="Select Appointment Date"
                                    dateFormat={"dd MMM YYYY"}
                                    showPopperArrow={false}
                                    selected={values.appointmentDate}
                                    onChange={(date) => {
                                      // Store the date as a Date object to avoid timezone issues
                                      setFieldValue("appointmentDate", date);
                                      handleFetchPIC({
                                        ...values,
                                        appointmentDate: date,
                                      });
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
                                )}
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
                          key={`pic-${JSON.stringify(values.appointmentDate)}-${
                            values.timeStart
                          }-${values.timeEnd}`}
                          isDisabled={
                            !values.appointmentType ||
                            !values.appointmentDate ||
                            !values.timeStart ||
                            !values.timeEnd
                          }
                          name="picId"
                          options={picOptions}
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
                                  handleFetchPIC({
                                    ...values,
                                    timeStart: e.target.value,
                                  });
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
                                value={values.timeEnd}
                                className={`form-control ${
                                  meta.error ? "is-invalid" : ""
                                }`}
                                required
                                {...field}
                                onChange={(e) => {
                                  setFieldValue("timeEnd", e.target.value);
                                  handleFetchPIC({
                                    ...values,
                                    timeEnd: e.target.value,
                                  });
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
                      {values.appointmentType?.toLowerCase() ===
                        "treatment" && (
                        <>
                          <hr />
                          <div className="col-md-6 mb-4">
                            <label htmlFor="timeEnd" className="form-label">
                              Treatment Name
                              <span className="text-danger"> *</span>
                            </label>
                            <Field name="treatmentId">
                              {() => (
                                <>
                                  <SelectDropdown
                                    name={`treatmentId`}
                                    options={treatmentTypes.map((item) => ({
                                      label: item.name,
                                      value: item.id,
                                    }))}
                                    selectedOption={values.treatmentId}
                                    placeholder={"Select Treatment"}
                                    onSelectOption={(option) =>
                                      setFieldValue(`treatmentId`, option.value)
                                    }
                                    onCreateOption={(value) => {
                                      dispatch(
                                        createTreatmentType({
                                          treatmentName: value,
                                        })
                                      );
                                    }}
                                  />
                                </>
                              )}
                            </Field>
                          </div>
                          {/* <div className="col-md-6 mb-4">
                          <label htmlFor="timeEnd" className="form-label">
                            Number of Appointment Repetitions
                            <span className="text-danger"> *</span>
                          </label>
                          <Field name={`numberOfRepetition`}>
                            {({ field, meta }) => (
                              <>
                                <input
                                  type="number"
                                  className={`form-control ${
                                    meta.error ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter total appointments to schedule (e.g. 3 for three total sessions)"
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
                        </div> */}
                          {/* <div className="col-md-6 mb-4">
                          <label htmlFor="timeEnd" className="form-label">
                            Treatment Day(s)
                            <span className="text-danger"> *</span>
                          </label>
                          <WeekdayPicker
                            name={`therapyDays`}
                            onChange={(options) => {
                              setFieldValue(
                                `therapyDays`,
                                options.map((option) => option.value)
                              );
                            }}
                          />
                        </div> */}
                        </>
                      )}
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
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      {/* <AddProposal previtems={previtems} /> */}
    </>
  );
};

export default AppointmentCreateContent;
