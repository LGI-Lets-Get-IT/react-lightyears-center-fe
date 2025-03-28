// import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { format } from "date-fns";

const TabDateTime = ({ error, setError, formData, setFormData }) => {
  const handleDateChange = (e) => {
    const rawDate = e.target.value;
    if (!rawDate) {
      setError(true);
      return;
    }

    setFormData({
      ...formData,
      appointmentDate: rawDate, // directly store raw value (YYYY-MM-DD)
    });

    setError(false);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target; // name: timeStart / timeEnd

    const datePart = formData.appointmentDate;
    if (!datePart || !value) {
      setFormData({ ...formData, [name]: "" });
      return;
    }

    const [hours, minutes] = value.split(":");
    const fullDateTime = new Date(`${datePart}T${hours}:${minutes}:00`);

    const updatedForm = {
      ...formData,
      [name]: fullDateTime.toISOString(), // for backend
    };

    if (updatedForm.timeStart && updatedForm.timeEnd) {
      updatedForm.appointmentTime = `${e.target.form.timeStart.value} - ${e.target.form.timeEnd.value}`;
    }

    setFormData(updatedForm);

    if (updatedForm.timeStart && updatedForm.timeEnd && datePart) {
      setError(false);
    }
  };

  return (
    <section className="step-body mt-4 body current">
      <form id="project-datetime">
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Date & Time</h2>
            <p className="text-muted">
              Select the date and time for this appointment.
            </p>
          </div>

          {error && (
            <label
              id="appointment-error"
              className="error text-danger mb-2 d-flex align-items-center gap-1"
            >
              <FiAlertTriangle /> All fields are required.
            </label>
          )}

          <div className="mb-4">
            <label htmlFor="appointmentDate" className="form-label">
              Appointment Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate || ""}
              onChange={handleDateChange}
              className={`form-control ${
                error && !formData.appointmentDate ? "is-invalid" : ""
              }`}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="timeStart" className="form-label">
                Start Time <span className="text-danger">*</span>
              </label>
              <input
                type="time"
                id="timeStart"
                name="timeStart"
                value={
                  formData.timeStart
                    ? new Date(formData.timeStart).toTimeString().slice(0, 5)
                    : ""
                }
                onChange={handleTimeChange}
                className={`form-control ${
                  error && !formData.timeStart ? "is-invalid" : ""
                }`}
                required
              />
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="timeEnd" className="form-label">
                End Time <span className="text-danger">*</span>
              </label>
              <input
                type="time"
                id="timeEnd"
                name="timeEnd"
                value={
                  formData.timeEnd
                    ? new Date(formData.timeEnd).toTimeString().slice(0, 5)
                    : ""
                }
                onChange={handleTimeChange}
                className={`form-control ${
                  error && !formData.timeEnd ? "is-invalid" : ""
                }`}
                required
              />
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default TabDateTime;
