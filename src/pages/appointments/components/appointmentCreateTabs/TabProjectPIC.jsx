// import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const TabProjectPIC = ({ error, setError, formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, psychologistName: value });

    // Clear error if valid
    if (value.trim() !== "") {
      setError(false);
    }
  };

  return (
    <section className="step-body mt-4 body current">
      <form id="project-details">
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Psychologist In Charge</h2>
            <p className="text-muted">
              Psychologist in charge in this appointment.
            </p>
          </div>

          {error && (
            <label
              id="psychologistName-error"
              className="error text-danger mb-2 d-flex align-items-center gap-1"
            >
              <FiAlertTriangle /> This field is required.
            </label>
          )}

          <fieldset>
            <div className="mb-4">
              <label htmlFor="psychologistName" className="form-label">
                PIC Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id="psychologistName"
                name="psychologistName"
                value={formData.psychologistName}
                onChange={handleInputChange}
                required
              />
            </div>
          </fieldset>
        </fieldset>
      </form>
    </section>
  );
};

export default TabProjectPIC;
