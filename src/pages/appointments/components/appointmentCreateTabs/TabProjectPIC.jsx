// import React from "react";
import { fetchAllEmployees } from "@/store/slice/employeeSlice";
import { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const TabProjectPIC = ({ error, setError, formData, setFormData }) => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [])

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
              <select
                id="psychologist"
                className={`form-control ${
                  error && !formData.psychologistId ? "is-invalid" : ""
                }`}
                value={formData.psychologistId}
                onChange={(e) => {
                  const selectedEmployeeId = parseInt(e.target.value);
                  console.log('selectedEmployeeId', selectedEmployeeId)
                  // const selectedEmployee = employees.find((employee) => employee.id === selectedId);
                  setFormData({ ...formData, psychologistId: selectedEmployeeId }); // 👈 fix is here
                }}
                required
              >
                <option value="">-- Select Psychologist --</option>
                {employees?.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.fullName}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </fieldset>
      </form>
    </section>
  );
};

export default TabProjectPIC;
